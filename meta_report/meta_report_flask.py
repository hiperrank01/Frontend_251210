import os
import sys
import requests
from dotenv import load_dotenv
from datetime import datetime
from flask import Flask, render_template

# 윈도우 터미널 한글 깨짐 방지
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')

load_dotenv()

app = Flask(__name__)

def get_api_config():
    """API 설정을 가져옵니다."""
    access_token = os.getenv('META_ACCESS_TOKEN')
    ad_account_id = os.getenv('AD_ACCOUNT_ID')
    
    if ad_account_id:
        # '#' 문자가 포함된 경우 앞부분(실제 ID)만 추출
        ad_account_id = ad_account_id.split('#')[0].strip()
        
        if not ad_account_id.startswith('act_'):
            ad_account_id = f"act_{ad_account_id}"
            
    return access_token, ad_account_id

def fetch_monthly_insights():
    """월별 광고 인사이트 데이터를 가져옵니다."""
    access_token, ad_account_id = get_api_config()
    url = f"https://graph.facebook.com/v21.0/{ad_account_id}/insights"
    params = {
        'access_token': access_token,
        'date_preset': 'maximum',
        'time_increment': 'monthly',
        'fields': 'impressions,clicks,spend,actions,action_values,cpc,purchase_roas',
        'level': 'account'
    }
    
    print(f"🆔 [월별] 광고 계정 ID: {ad_account_id}")
    print(f"🔗 API 요청 시작: {url}")
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json().get('data', [])
            print(f"✅ [월별] {len(data)}건 조회 성공")
            return data
        print(f"❌ [월별] 통신 실패 (HTTP {response.status_code}): {response.text}")
        return []
    except Exception as e:
        print(f"🚫 [월별] 에러 발생: {e}")
        return []

def fetch_campaign_insights():
    """캠페인별 월별 인사이트 데이터를 가져옵니다."""
    access_token, ad_account_id = get_api_config()
    url = f"https://graph.facebook.com/v21.0/{ad_account_id}/insights"
    params = {
        'access_token': access_token,
        'date_preset': 'last_90d', # 등락폭 계산을 위해 데이터 확보(90일)
        'time_increment': 'monthly',
        'fields': 'campaign_id,campaign_name,action_values',
        'level': 'campaign',
        'limit': 500
    }
    
    print(f"🔍 [캠페인] API 요청 시작: {url}")
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json().get('data', [])
            print(f"✅ [캠페인] {len(data)}건 조회 성공")
            return data
        print(f"❌ [캠페인] 통신 실패 (HTTP {response.status_code}): {response.text}")
        return []
    except Exception as e:
        print(f"🚫 [캠페인] 에러 발생: {e}")
        return []

def fetch_adset_insights():
    """광고그룹별 월별 인사이트 데이터를 가져옵니다."""
    access_token, ad_account_id = get_api_config()
    url = f"https://graph.facebook.com/v21.0/{ad_account_id}/insights"
    params = {
        'access_token': access_token,
        'date_preset': 'last_90d', # 등락폭 계산을 위해 데이터 확보(90일)
        'time_increment': 'monthly',
        'fields': 'adset_id,adset_name,action_values',
        'level': 'adset',
        'limit': 500
    }
    
    print(f"🔍 [광고그룹] API 요청 시작: {url}")
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json().get('data', [])
            print(f"✅ [광고그룹] {len(data)}건 조회 성공")
            return data
        print(f"❌ [광고그룹] 통신 실패 (HTTP {response.status_code}): {response.text}")
        return []
    except Exception as e:
        print(f"🚫 [광고그룹] 에러 발생: {e}")
        return []

def extract_conversion_value(action_values):
    """action_values에서 전환매출 추출"""
    if not action_values:
        return 0
    for val in action_values:
        if val.get('action_type') in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
            return float(val.get('value', 0))
    return 0

def process_fluctuation_data(raw_data, id_field, name_field):
    """캠페인/광고그룹 등락 데이터 처리"""
    grouped = {}
    for item in raw_data:
        item_id = item.get(id_field)
        item_name = item.get(name_field, 'Unknown')
        date_start = item.get('date_start', '')
        conversion_value = extract_conversion_value(item.get('action_values', []))
        
        if item_id not in grouped:
            grouped[item_id] = {'name': item_name, 'id': item_id, 'months': []}
        grouped[item_id]['months'].append({'date': date_start, 'value': conversion_value})
    
    results = []
    print(f"\n📊 [{id_field}] 등락 분석 시작 (총 {len(grouped)}개 그룹)")
    
    # 디버깅: 원본 데이터에 어떤 액션들이 있는지 확인
    detected_actions = set()
    for item in raw_data:
        for val in item.get('action_values', []):
            detected_actions.add(val.get('action_type'))
    if detected_actions:
        print(f"   🔍 감지된 액션 종류: {list(detected_actions)}")
    else:
        print("   ⚠️ 감지된 액션(action_values)이 전혀 없습니다.")

    for item_id, data in grouped.items():
        months = sorted(data['months'], key=lambda x: x['date'])
        if len(months) >= 2:
            previous = months[-2]['value']
            current = months[-1]['value']
        elif len(months) == 1:
            previous = 0
            current = months[0]['value']
        else:
            continue
            
        change = current - previous
        percentage = (change / previous * 100) if previous > 0 else (100 if current > 0 else 0)
        
        print(f"   - {data['name']} ({item_id}): 전월 {previous} -> 이번달 {current} (증감: {change})")
        
        results.append({
            'id': item_id, 'name': data['name'], 'previous': int(previous),
            'current': int(current), 'change': int(change), 'percentage': round(percentage, 1)
        })
    
    increases = sorted([r for r in results if r['change'] > 0], key=lambda x: x['change'], reverse=True)
    decreases = sorted([r for r in results if r['change'] < 0], key=lambda x: x['change'])
    stables = sorted([r for r in results if r['change'] == 0], key=lambda x: x['name'])
    
    print(f"✅ 분석 완료: 증가 {len(increases)}건, 감소 {len(decreases)}건, 변동없음 {len(stables)}건")
    return {'increases': increases, 'decreases': decreases, 'stables': stables}

def process_account_data(raw_data):
    """계정 레벨 데이터 처리"""
    if not raw_data:
        return {
            'total': {'period': 'TOTAL', 'clicks': 0, 'impressions': 0, 'spend': 0, 
                      'conversions': 0, 'conversion_value': 0, 'cpc': 0, 'roas': 0},
            'monthly': [],
            'mom': {'current': {}, 'previous': {}, 'change': {}},
            'chart_data': {'labels': [], 'spend': [], 'conversion_value': [], 'roas': []}
        }
    
    processed = []
    totals = {'clicks': 0, 'impressions': 0, 'spend': 0, 'conversions': 0, 
              'conversion_value': 0, 'cpc_sum': 0, 'roas_sum': 0, 'count': 0}
    
    for item in raw_data:
        date_start = item.get('date_start', '')
        if date_start:
            dt = datetime.strptime(date_start, '%Y-%m-%d')
            period = f"{dt.year}년 {dt.month}월"
            chart_label = f"{dt.year}-{dt.month:02d}"
        else:
            period = 'N/A'
            chart_label = 'N/A'
        
        clicks = int(item.get('clicks', 0))
        impressions = int(item.get('impressions', 0))
        spend = float(item.get('spend', 0))
        cpc = float(item.get('cpc', 0))
        
        actions = item.get('actions', [])
        conversions = sum(int(float(a.get('value', 0))) for a in actions 
                         if a.get('action_type') in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase'])
        
        action_values = item.get('action_values', [])
        conversion_value = sum(float(v.get('value', 0)) for v in action_values 
                              if v.get('action_type') in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase'])
        
        purchase_roas = item.get('purchase_roas', [])
        roas = 0
        for r in purchase_roas:
            if r.get('action_type') in ['omni_purchase', 'purchase']:
                roas = float(r.get('value', 0))
                break
        
        processed.append({
            'period': period, 'chart_label': chart_label, 'clicks': clicks, 'impressions': impressions,
            'spend': int(spend), 'conversions': conversions, 
            'conversion_value': int(conversion_value), 'cpc': int(cpc), 'roas': round(roas * 100, 2)
        })
        
        totals['clicks'] += clicks
        totals['impressions'] += impressions
        totals['spend'] += spend
        totals['conversions'] += conversions
        totals['conversion_value'] += conversion_value
        totals['cpc_sum'] += cpc
        totals['roas_sum'] += roas
        totals['count'] += 1
    
    avg_cpc = int(totals['cpc_sum'] / totals['count']) if totals['count'] > 0 else 0
    avg_roas = round((totals['roas_sum'] / totals['count']) * 100, 2) if totals['count'] > 0 else 0
    
    # 전달대비 데이터 계산
    mom = {'current': {}, 'previous': {}, 'change': {}}
    if len(processed) >= 2:
        current = processed[-1]
        previous = processed[-2]
        mom['current'] = current
        mom['previous'] = previous
        mom['change'] = {
            'clicks': current['clicks'] - previous['clicks'],
            'impressions': current['impressions'] - previous['impressions'],
            'spend': current['spend'] - previous['spend'],
            'conversions': current['conversions'] - previous['conversions'],
            'conversion_value': current['conversion_value'] - previous['conversion_value'],
            'cpc': current['cpc'] - previous['cpc'],
            'roas': round(current['roas'] - previous['roas'], 2)
        }
    elif len(processed) == 1:
        mom['current'] = processed[0]
        mom['previous'] = {'clicks': 0, 'impressions': 0, 'spend': 0, 'conversions': 0, 'conversion_value': 0, 'cpc': 0, 'roas': 0}
        mom['change'] = processed[0]
    
    # 차트 데이터
    chart_data = {
        'labels': [p['chart_label'] for p in processed],
        'spend': [p['spend'] for p in processed],
        'conversion_value': [p['conversion_value'] for p in processed],
        'roas': [p['roas'] for p in processed]
    }
    
    return {
        'total': {'period': 'TOTAL', 'clicks': totals['clicks'], 'impressions': totals['impressions'],
                  'spend': int(totals['spend']), 'conversions': totals['conversions'],
                  'conversion_value': int(totals['conversion_value']), 'cpc': avg_cpc, 'roas': avg_roas},
        'monthly': processed,
        'mom': mom,
        'chart_data': chart_data
    }

@app.route('/')
def report():
    print("\n" + "="*50)
    print("🔔 [DEBUG] 리포트 페이지 접속 요청 감지!")
    print("="*50)
    # 계정 레벨 월별 데이터
    account_data = fetch_monthly_insights()
    data = process_account_data(account_data)
    
    # 캠페인 등락 데이터
    campaign_data = fetch_campaign_insights()
    campaign_fluctuation = process_fluctuation_data(campaign_data, 'campaign_id', 'campaign_name')
    
    # 광고그룹 등락 데이터
    adset_data = fetch_adset_insights()
    adset_fluctuation = process_fluctuation_data(adset_data, 'adset_id', 'adset_name')
    
    return render_template(
        'report.html', 
        data=data, 
        chart_data=data['chart_data'],
        campaign_fluctuation=campaign_fluctuation,
        adset_fluctuation=adset_fluctuation
    )

if __name__ == '__main__':
    print("🚀 Flask 서버 시작: http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
