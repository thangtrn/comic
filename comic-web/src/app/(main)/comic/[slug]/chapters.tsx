import React from "react";
import Link from "next/link";
import Section from "~/components/shared/Section";
import { Button } from "~/components/ui/button";

const Chapters = () => {
  return (
    <Section title="Danh sách chương - 1">
      <div className="relative max-h-[500px] overflow-x-auto overflow-y-auto rounded">
        <table className="w-full table-fixed text-left text-sm text-gray-500">
          <thead className="sticky top-0 z-10 bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">
                Số chương
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Ngày cập nhật
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 })
              .map((_, index) => (
                <tr className="border-b odd:bg-white even:bg-gray-100" key={index}>
                  <th scope="row" className="whitespace-nowrap px-4 py-2">
                    <Button variant="link" asChild className="h-fit p-0 text-sm">
                      <Link href="/comic/1/chapter/chapter-2">Chapter {index + 1}</Link>
                    </Button>
                  </th>
                  <td className="px-4 py-2 text-right">16/09/2024</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default Chapters;
