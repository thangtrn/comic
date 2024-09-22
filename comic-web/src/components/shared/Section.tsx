import React from "react";
import Link from "next/link";
import { Else, RenderIf, Then } from "./RenderIf";
import { cn } from "~/lib/utils";
import { ChevronRight } from "lucide-react";
import EmptyStates from "./EmptyStates";

interface SectionProps {
  title?: React.ReactNode;
  link?: string;
  children?: React.ReactNode | null;
  className?: string;
  footer?: React.ReactNode;
  showEmptyStates?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  link,
  children,
  className,
  footer,
  showEmptyStates = true,
}) => {
  return (
    <section className={cn("mb-5", className)}>
      <RenderIf condition={!!title}>
        <div className="fy-center justify-between">
          <h2 className="mb-2 text-2xl font-semibold leading-none">{title}</h2>
          <RenderIf condition={!!link}>
            <Link
              href={link!}
              className="flex items-end text-sm leading-none text-text-secondary hover:text-primary"
            >
              <span>Xem thêm</span> <ChevronRight size={14} />
            </Link>
          </RenderIf>
        </div>
      </RenderIf>
      <RenderIf condition={!!children}>
        <Then>{children}</Then>
        <Else>
          <RenderIf condition={showEmptyStates}>
            <EmptyStates classNames={{ base: "bg-accent" }} />
          </RenderIf>
        </Else>
      </RenderIf>
      {footer}
    </section>
  );
};

export default Section;
