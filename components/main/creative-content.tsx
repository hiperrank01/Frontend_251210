import React, { useState } from "react";
import { useSharedDragToScroll } from "@/hooks/use-shared-drag-to-scroll";
import Image from "next/image";
import { youtubeCategories } from "@/data/youtube-data";
import { Video, Category } from "@/types/youtube";

interface ScrollableRowProps {
  category: Category;
}

interface VideoItemProps {
  video: Video;
  categoryTitle: string;
  videoIndex: number;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  categoryTitle,
  videoIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg overflow-hidden select-none relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={(e) => e.preventDefault()}
    >
      {isHovered ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&rel=0`}
          title={`YouTube video player - ${categoryTitle} ${videoIndex + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <Image
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={`${categoryTitle} ${videoIndex + 1} thumbnail`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

const ScrollableRow: React.FC<ScrollableRowProps> = ({ category }) => {
  const { draggableRef, scrollableRef } = useSharedDragToScroll<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <div ref={draggableRef} className="relative">
      <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
      <div
        ref={scrollableRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
      >
        {category.videos.map((video, videoIndex) => (
          <VideoItem
            key={videoIndex}
            video={video}
            categoryTitle={category.title}
            videoIndex={videoIndex}
          />
        ))}
      </div>
    </div>
  );
};

export const Creative = () => {
  return (
    <div className="w-full mt-8 space-y-8">
      {youtubeCategories.map((category, index) => (
        <ScrollableRow key={index} category={category} />
      ))}
      <div className="flex flex-col items-center justify-center mt-8">
        <Image
          src="/단가표01.png"
          alt="단가표01"
          className="max-w-full h-auto"
          width={1000}
          height={200}
        />
                <Image
          src="/단가표02.png"
          alt="단가표02"
          className="max-w-full h-auto"
          width={1000}
          height={200}
        />
        
        <p>부가세 미포함</p>
        <p>※계좌이체 입금</p>
        <p>※세금계산서 발행 가능합니다.</p>
        <p>※입금 후 확인시 멤버십으로 변경해드립니다.</p>
        <p>국민 242401-04-434624</p>
      </div>
    </div>
  );
};
