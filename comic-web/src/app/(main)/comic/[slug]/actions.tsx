"use client";
import { Bell, BellOff, Bookmark, BookmarkCheck, BookOpen, Heart, Share2, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RenderIf } from "~/components/shared/RenderIf";
import { Button } from "~/components/ui/button";

const Actions = () => {
  const [love, setLove] = useState(false);
  const [follow, setFollow] = useState(false);
  const [notification, setNotification] = useState(true);

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/">
            <BookOpen size={16} className="mr-2" /> Đọc ngay
          </Link>
        </Button>
        <Button asChild>
          <Link href="/">
            <Zap size={16} className="mr-2" /> Chap mới nhất
          </Link>
        </Button>
        <Button variant="ghost">
          <Share2 size={16} className="mr-2" /> Chia sẻ
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant={love ? "default" : "outline"} size="icon" onClick={() => setLove(!love)}>
          <Heart size={18} />
        </Button>
        <Button
          variant={follow ? "default" : "outline"}
          size="icon"
          onClick={() => setFollow(!follow)}
        >
          {follow ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </Button>
        <RenderIf condition={follow}>
          <Button
            variant={follow ? "ghost" : "outline"}
            size="icon"
            onClick={() => setNotification(!notification)}
          >
            {notification ? <Bell size={18} /> : <BellOff size={18} />}
          </Button>
        </RenderIf>
      </div>
    </>
  );
};

export default Actions;
