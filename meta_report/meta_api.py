import os
import sys
import requests
import logging
from dotenv import load_dotenv
from datetime import datetime
#pip install -r .\meta_report\requirements.txt
#.env를 만들고 키값 넣어야됨. 키값은 메일로 보냄 
load_dotenv()

def fetch_meta_insights():
    access_token = os.getenv('META_ACCESS_TOKEN')
    ad_account_id = os.getenv('AD_ACCOUNT_ID')

    if ad_account_id and not ad_account_id.startswith('act_'):
        ad_account_id = f"act_{ad_account_id}"

    # Meta Graph API 엔드포인트
    url = f"https://graph.facebook.com/v21.0/{ad_account_id}/insights"
    
    # 요청 파라미터 (curl -d 옵션과 동일)
    params = {
        'access_token': access_token,
        'date_preset': 'maximum',  # 전체 기간 (lifetime)
        'fields': 'impressions,clicks,spend,actions,action_values,cpc,purchase_roas',
        'level': 'account'
    }

    print(f"🔗 API 요청 시작: {url}")
    
    try:
        # 건별 요청 실행
        response = requests.get(url, params=params)
        status_code = response.status_code
        
        # 2. HTTP 상태 코드에 따른 로그 처리
        if status_code == 200:
            print(f"✅ 통신 성공 (HTTP {status_code})")
            res_data = response.json().get('data', [])
            
            # 3. 데이터 유무에 따른 메시지 분리
            if not res_data:
                print("🔔 통신은 성공했으나, 전체 기간(maximum)에 집행된 광고 데이터가 없습니다.")
                return "EMPTY"
            else:
                print(f"📈 {len(res_data)}건의 데이터를 성공적으로 불러왔습니다.")
                for item in res_data:
                    format_and_print_metrics(item)
                return res_data
        else:
            print(f"❌ 통신 실패 (HTTP {status_code})")
            print(f"상세 에러 내용: {response.text}")
            return "ERROR"

    except requests.exceptions.RequestException as e:
        print(f"🚫 네트워크 예외 발생: {str(e)}")
        return "EXCEPTION"

def format_and_print_metrics(data):
    """
    API 응답 데이터를 한글 항목명으로 변환하여 출력
    """
    print("-" * 50)
    print(f"📅 기간: {data.get('date_start', 'N/A')} ~ {data.get('date_end', 'N/A')}")
    
    impressions = data.get('impressions', '0')
    clicks = data.get('clicks', '0')
    spend = data.get('spend', '0')
    cpc = data.get('cpc', '0')
    
    # 전환수 (Actions 중 purchase 혹은 total actions)
    # actions는 리스트 형태 [{'action_type': '...', 'value': '...'}]
    actions = data.get('actions', [])
    total_conversions = 0
    for action in actions:
        # 'purchases' 또는 'omni_purchase' 등 실제 전환으로 간주할 타입 합산
        # 여기서는 모든 행동(actions)을 합산하거나, 특정 타입만 지정 가능
        # 일반적인 '전환'은 purchase로 가정
        if action.get('action_type') in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
             total_conversions += float(action.get('value', 0))
    
    # 전환매출액 (Action Values)
    action_values = data.get('action_values', [])
    total_conversion_value = 0
    for val in action_values:
         if val.get('action_type') in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
             total_conversion_value += float(val.get('value', 0))

    # ROAS (Purchase ROAS)
    purchase_roas = data.get('purchase_roas', [])
    roas = 0
    if purchase_roas:
        # 보통 리스트의 첫번째 항목 사용 or 합산
        for item in purchase_roas:
            if item.get('action_type') in ['purchase', 'omni_purchase', 'purchase_roas']: # action_type 확인 필요
                roas = float(item.get('value', 0))
                break 
        # API 구조상 purchase_roas의 action_type은 usually 'omni_purchase' or 'purchase'

    print(f"👁️ 노출수: {impressions}")
    print(f"Hx 클릭수: {clicks}")
    print(f"💸 비용: {spend} 원") # 통화 단위 확인 필요 (보통 계정 설정따라감)
    print(f"🔄 전환수 (구매): {int(total_conversions)}") 
    print(f"💰 전환매출액: {total_conversion_value:,.0f} 원") 
    print(f"wv 평균CPC: {cpc}")
    print(f"📈 ROAS: {roas}")
    print("-" * 50)

def run_process():
    print("🚀 [메타 광고 데이터 추출 프로세스 시작]")
    result = fetch_meta_insights()
    
    if result == "EMPTY":
        print("\n[결과] 서버와 연결되었습니다. 하지만 광고 집행 내역이 없어 '데이터가 없습니다'.")
    elif result == "ERROR" or result == "EXCEPTION":
        print("\n[결과] API 통신 중 오류가 발생했습니다.")
    else:
        print("\n[결과] 데이터를 성공적으로 수신했습니다.")
        # 이미 format_and_print_metrics에서 출력함
    
    print("🔚 [프로세스 종료]")

if __name__ == "__main__":
    run_process()