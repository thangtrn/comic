import React from "react";
import { cn } from "~/lib/utils";

interface EmptyStatesProps {
  children?: React.ReactNode | undefined;
  title?: string;
  subtitle?: string;
  classNames?: {
    base?: string | undefined;
    title?: string | undefined;
    subtitle?: string | undefined;
    action?: string | undefined;
  };
  size?: number;
}

const EmptyStates: React.FC<EmptyStatesProps> = ({
  children,
  title = "Trống",
  subtitle,
  classNames,
  size = 100,
}) => {
  return (
    <div className={cn("grid w-full gap-4 rounded py-2", classNames?.base)}>
      <svg
        className="mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 128 124"
        fill="none"
      >
        <g filter="url(#filter0_d_14133_718)">
          <path
            d="M4 61.0062C4 27.7823 30.9309 1 64.0062 1C97.0319 1 124 27.7699 124 61.0062C124 75.1034 119.144 88.0734 110.993 98.3057C99.7572 112.49 82.5878 121 64.0062 121C45.3007 121 28.2304 112.428 17.0071 98.3057C8.85599 88.0734 4 75.1034 4 61.0062Z"
            fill="#F9FAFB"
          />
        </g>
        <path
          d="M110.158 58.4715H110.658V57.9715V36.9888C110.658 32.749 107.226 29.317 102.986 29.317H51.9419C49.6719 29.317 47.5643 28.165 46.3435 26.2531L46.342 26.2509L43.7409 22.2253L43.7404 22.2246C42.3233 20.0394 39.8991 18.7142 37.2887 18.7142H20.8147C16.5749 18.7142 13.1429 22.1462 13.1429 26.386V57.9715V58.4715H13.6429H110.158Z"
          fill="#EEF2FF"
          stroke="#A5B4FC"
        />
        <path
          d="M49 20.2142C49 19.6619 49.4477 19.2142 50 19.2142H106.071C108.281 19.2142 110.071 21.0051 110.071 23.2142V25.6428H53C50.7909 25.6428 49 23.8519 49 21.6428V20.2142Z"
          fill="#A5B4FC"
        />
        <circle
          cx="1.07143"
          cy="1.07143"
          r="1.07143"
          transform="matrix(-1 0 0 1 36.1429 23.5)"
          fill="#4F46E5"
        />
        <circle
          cx="1.07143"
          cy="1.07143"
          r="1.07143"
          transform="matrix(-1 0 0 1 29.7144 23.5)"
          fill="#4F46E5"
        />
        <circle
          cx="1.07143"
          cy="1.07143"
          r="1.07143"
          transform="matrix(-1 0 0 1 23.2858 23.5)"
          fill="#4F46E5"
        />
        <path
          d="M112.363 95.459L112.362 95.4601C111.119 100.551 106.571 104.14 101.323 104.14H21.8766C16.6416 104.14 12.0808 100.551 10.8498 95.4592C10.8497 95.4591 10.8497 95.459 10.8497 95.459L1.65901 57.507L1.65896 57.5068C0.0470794 50.8383 5.09094 44.4286 11.9426 44.4286H111.257C118.108 44.4286 123.166 50.8371 121.541 57.5069L112.363 95.459ZM112.363 95.459L121.541 57.5077L112.363 95.459Z"
          fill="white"
          stroke="#E5E7EB"
        />
        <path
          d="M65.7893 82.4286C64.9041 82.4286 64.17 81.6945 64.17 80.7877C64.17 77.1605 58.686 77.1605 58.686 80.7877C58.686 81.6945 57.9519 82.4286 57.0451 82.4286C56.1599 82.4286 55.4258 81.6945 55.4258 80.7877C55.4258 72.8424 67.4302 72.8639 67.4302 80.7877C67.4302 81.6945 66.6961 82.4286 65.7893 82.4286Z"
          fill="#4F46E5"
        />
        <path
          d="M79.7153 68.5462H72.9358C72.029 68.5462 71.2949 67.8121 71.2949 66.9053C71.2949 66.0201 72.029 65.286 72.9358 65.286H79.7153C80.6221 65.286 81.3562 66.0201 81.3562 66.9053C81.3562 67.8121 80.6221 68.5462 79.7153 68.5462Z"
          fill="#4F46E5"
        />
        <path
          d="M49.9204 68.546H43.1409C42.2341 68.546 41.5 67.8119 41.5 66.9051C41.5 66.0198 42.2341 65.2858 43.1409 65.2858H49.9204C50.8056 65.2858 51.5396 66.0198 51.5396 66.9051C51.5396 67.8119 50.8056 68.546 49.9204 68.546Z"
          fill="#4F46E5"
        />
        <circle cx="107.929" cy="91.0001" r="18.7143" fill="#EEF2FF" stroke="#E5E7EB" />
        <path
          d="M115.161 98.2322L113.152 96.2233M113.554 90.1965C113.554 86.6461 110.676 83.7679 107.125 83.7679C103.575 83.7679 100.697 86.6461 100.697 90.1965C100.697 93.7469 103.575 96.6251 107.125 96.6251C108.893 96.6251 110.495 95.9111 111.657 94.7557C112.829 93.5913 113.554 91.9786 113.554 90.1965Z"
          stroke="#4F46E5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <defs>
          <filter
            id="filter0_d_14133_718"
            x={2}
            y={0}
            width={124}
            height={124}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={1} />
            <feGaussianBlur stdDeviation={1} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14133_718" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_14133_718"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <div>
        <h2
          className={cn(
            "pb-1 text-center text-base font-semibold leading-relaxed",
            classNames?.title,
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "pb-4 text-center text-sm font-normal leading-snug text-secondary",
              classNames?.subtitle,
            )}
          >
            {subtitle}
          </p>
        )}
        {children && <div className={cn("flex gap-3", classNames?.action)}>{children}</div>}
      </div>
    </div>
  );
};

export default EmptyStates;
