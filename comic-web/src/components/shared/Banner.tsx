import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Badge } from "../ui/badge";

const images = [
  {
    name: "Elf Love Confessions",
    lastChapter: "Chapter 123",
    img: "https://mangadex.org/covers/5f47d978-0896-4b1f-8846-e156ee1f4fa1/970aeffd-b086-49a6-871b-ebf8906612f2.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quo ut aliquid quod accusantium asperiores harum iusto sit, eius provident ipsum explicabo a libero est ex natus atque ipsa quasi.",
    genres: [
      {
        name: "Hành động",
        _id: "123123",
      },
      {
        name: "Kinh dị",
        _id: "123123",
      },
      {
        name: "Trinh thám",
        _id: "123123",
      },
      {
        name: "Drama",
        _id: "123123",
      },
    ],
  },
  {
    name: "Tonari no Seki no Yankee Shimizu-san ga Kami o Kuroku Sometekita",
    lastChapter: "Chapter 123",
    img: "https://mangadex.org/covers/628c13b7-dcef-4434-94c4-15ba177e154e/f6f5e3fa-d11c-4bd1-a512-b75c14d1080a.jpg.512.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quo ut aliquid quod accusantium asperiores harum iusto sit, eius provident ipsum explicabo a libero est ex natus atque ipsa quasi.",
    genres: [
      {
        name: "Hành động",
        _id: "123123",
      },
      {
        name: "Kinh dị",
        _id: "123123",
      },
      {
        name: "Trinh thám",
        _id: "123123",
      },
      {
        name: "Drama",
        _id: "123123",
      },
    ],
  },
  {
    name: "Irozuku Monochrome",
    lastChapter: "Chapter 123",
    img: "https://mangadex.org/covers/046746c9-8872-4797-a112-318642fdb272/d7f57e2a-8f4d-4df0-b9b5-ef68ce5b74ff.png.512.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quo ut aliquid quod accusantium asperiores harum iusto sit, eius provident ipsum explicabo a libero est ex natus atque ipsa quasi.",
    genres: [
      {
        name: "Hành động",
        _id: "123123",
      },
      {
        name: "Kinh dị",
        _id: "123123",
      },
      {
        name: "Trinh thám",
        _id: "123123",
      },
      {
        name: "Drama",
        _id: "123123",
      },
    ],
  },
];

const Banner = () => {
  return (
    <Carousel className="mb-5 w-full" opts={{ loop: true }}>
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <div className="px-1 py-3">
              <div className="fy-center group relative aspect-[16/5] overflow-hidden rounded-lg shadow shadow-gray-400">
                <figure
                  className="absolute inset-0 z-[1] size-full rounded-lg bg-cover bg-[center_30%]"
                  style={{ backgroundImage: `url("${item.img}")` }}
                />
                <figure className="absolute inset-0 z-[2] size-full rounded-lg bg-gradient-to-l from-[#ffffff99] to-white" />
                <div className="z-[3] flex h-[70%] w-full flex-1 gap-6 px-10 md:px-16">
                  <div className="flex-1">
                    <h3 className="text-2xl">{item.lastChapter}</h3>
                    <h1 className="mb-3 line-clamp-2 text-3xl font-bold transition-all hover:text-primary">
                      <Link href="/">{item.name}</Link>
                    </h1>
                    <ul className="mb-3 flex gap-2">
                      {item.genres.map((genre, index) => (
                        <li key={index}>
                          <Badge asChild>
                            <Link href={`/genres/${genre._id}`}>{genre.name}</Link>
                          </Badge>
                        </li>
                      ))}
                    </ul>
                    <p className="line-clamp-4 text-sm">
                      {item.description} {item.description} {item.description}
                    </p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="z-[3] flex h-full w-[40%] items-center justify-center overflow-hidden"
                >
                  <figure className="image-cover relative h-[140%] w-[60%] rotate-[22deg] border-4 border-primary object-top">
                    <Image
                      src={item.img}
                      alt="img-banner"
                      width={193}
                      height={276}
                      className="transition-smooth group-hover:scale-110"
                    />
                  </figure>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-6 right-3 flex gap-3">
        <CarouselPrevious className="rounded" variant="default" />
        <CarouselNext className="rounded" variant="default" />
      </div>
    </Carousel>
  );
};

export default Banner;
