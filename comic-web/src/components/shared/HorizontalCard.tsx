"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RenderIf } from "./RenderIf";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Eye, MessageSquareMore } from "lucide-react";

interface HorizontalCardProps {
  imgSrc: string;
  chapter: string;
  title: string;
  linkHref: string;
  className?: string;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  imgSrc,
  chapter,
  title,
  linkHref,
  className,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <div className={cn("group flex h-20 gap-2", className)}>
      <Link
        href={linkHref}
        className="image-cover mb-2 aspect-comic h-full w-fit rounded bg-gray-200"
      >
        <RenderIf condition={isLoading}>
          <Skeleton className="size-full" />
        </RenderIf>
        <Image
          src={imgSrc}
          alt={title}
          width={193}
          height={276}
          loading="lazy"
          className={cn(isLoading || (isError && "invisible"))}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsError(true);
            setIsLoading(false);
          }}
        />
      </Link>
      <div className="flex-1 text-sm">
        <Link href={linkHref}>
          <h6
            title={title}
            className="transition-smooth line-clamp-1 font-medium group-hover:text-primary"
          >
            {title}
          </h6>
        </Link>

        <div className="flex items-center justify-between">
          <h3 className="text-xs">{chapter}</h3>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-[2px]">
              <Eye size={12} /> 0
            </span>
            <span className="flex items-center gap-[2px]">
              <MessageSquareMore size={12} /> 0
            </span>
          </div>
        </div>

        <span className="text-xs">5 minutes ago</span>
      </div>
    </div>
  );
};

export default HorizontalCard;
