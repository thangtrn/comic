import React from "react";
import Banner from "~/components/shared/Banner";
import HorizontalCard from "~/components/shared/HorizontalCard";
import Section from "~/components/shared/Section";
import VerticalCard from "~/components/shared/VerticalCard";

const HomePage = () => {
  return (
    <div className="container pt-10">
      <Banner />

      <div className="flex gap-4">
        <div className="basis-9/12">
          <Section title="Mới cập nhật" link="/">
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((item, index) => (
                <VerticalCard
                  key={index}
                  imgSrc="https://mangadex.org/covers/5f47d978-0896-4b1f-8846-e156ee1f4fa1/970aeffd-b086-49a6-871b-ebf8906612f2.jpg"
                  chapter="123"
                  title="Brain Damage"
                  linkHref={`/comic/${index}`}
                />
              ))}
            </div>
          </Section>
          <Section title="Mới cập nhật" link="/">
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((item, index) => (
                <VerticalCard
                  key={index}
                  imgSrc="https://mangadex.org/covers/5f47d978-0896-4b1f-8846-e156ee1f4fa1/970aeffd-b086-49a6-871b-ebf8906612f2.jpg"
                  chapter="123"
                  title="Brain Damage"
                  linkHref={`/comic/${index}`}
                />
              ))}
            </div>
          </Section>
        </div>
        <div className="basis-3/12">
          <Section title="Đề cử" link="/">
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
  );
};

export default HomePage;
