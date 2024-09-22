import { Eye, Heart, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HorizontalCard from "~/components/shared/HorizontalCard";
import Section from "~/components/shared/Section";
import { Badge } from "~/components/ui/badge";
import Chapters from "./chapters";
import Actions from "./actions";
import Comments from "./comments";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ComicPage = ({ params }: { params: { slug: string } }) => {
  const img =
    "https://mangadex.org/covers/046746c9-8872-4797-a112-318642fdb272/d7f57e2a-8f4d-4df0-b9b5-ef68ce5b74ff.png.512.jpg";
  return (
    <>
      <section className="container mb-10 flex w-full gap-4 bg-cover pt-10">
        <div className="w-full max-w-[250px]">
          <figure className="image-cover shadow-card aspect-[2/3] rounded-lg">
            <Image src={img} alt="thumbnail" width={450} height={600} />
          </figure>
        </div>
        <div className="flex-1">
          <h1 className="transition-smooth mb-2 text-4xl font-bold hover:text-primary">
            One-Punch Man
          </h1>
          <div className="flex flex-col gap-3 text-sm">
            <h4 className="text-xl font-semibold">Tên khác: One punch man</h4>
            <div className="">
              <span className="font-semibold">Tình trạng:</span> Đang tiến hành
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Tác giả:</span>
              <div className="flex gap-1">
                <Link href="/" className="transition-smooth hover:text-primary hover:underline">
                  Đang cập nhật
                </Link>
                -
                <Link href="/" className="transition-smooth hover:text-primary hover:underline">
                  One
                </Link>
                -
                <Link href="/" className="transition-smooth hover:text-primary hover:underline">
                  Sans
                </Link>
              </div>
            </div>
            <div className="fy-center gap-2">
              <span className="font-semibold">Tác giả:</span>
              <div className="fy-center flex-wrap gap-2">
                <Badge asChild>
                  <Link href={`/genres/1`}>Hành động</Link>
                </Badge>
                <Badge asChild>
                  <Link href={`/genres/1`}>Hành động</Link>
                </Badge>
                <Badge asChild>
                  <Link href={`/genres/1`}>Hành động</Link>
                </Badge>
              </div>
            </div>
            <div className="my-2 flex text-base font-semibold">
              <span className="f-center mr-2 gap-1 border-r pr-2">
                <Eye size={20} /> 123
              </span>
              <span className="f-center mr-2 gap-1 border-r pr-2">
                <Heart size={20} /> 123
              </span>
              <span className="f-center gap-1">
                <MessageSquareMore size={20} /> 132123
              </span>
            </div>

            <Actions />
          </div>
        </div>
      </section>

      <div className="container">
        <div className="flex gap-4">
          <div className="basis-9/12">
            <Section title="Nội dung">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, quod explicabo
              culpa eligendi at quis deleniti id saepe doloremque dignissimos aspernatur nihil iure
              ipsum odit corporis, voluptatibus neque quae molestiae!
            </Section>

            <Chapters />

            <Comments />
          </div>
          <div className="basis-3/12">
            <Section title="Đề xuất">
              <div className="flex flex-col gap-2">
                {Array.from({ length: 10 }).map((item, index) => (
                  <HorizontalCard
                    className="rounded-md p-2 odd:bg-accent"
                    key={index}
                    imgSrc="https://mangadex.org/covers/d8a959f7-648e-4c8d-8f23-f1f3f8e129f3/0380962e-26f8-4233-8c24-d36b2ebceb3e.jpg.512.jpg"
                    chapter="Chapter 202"
                    title="One-Punch Man"
                    linkHref={`/comic/${index}`}
                  />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicPage;
