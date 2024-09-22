import Image from "next/image";
import Link from "next/link";
import SearchBox from "~/components/layout/SearchBox";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Navigation from "./Navigation";

const Header = () => {
  const isLogin = false;
  return (
    <header className="sticky inset-0 top-0 z-50 bg-background shadow-header">
      <div className="fy-center container h-16">
        <Link href="/" className="fy-center h-full basis-2/12">
          <figure className="image-cover f-center h-fit w-40">
            <Image
              height={60}
              width={207}
              src="https://mangatooncom.vn/official/logo.svg"
              alt="logo"
            />
          </figure>
        </Link>

        <SearchBox />

        <Navigation />

        <div className="flex basis-2/12 justify-end gap-2">
          {isLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="rounded-full" variant="outline">
                Đăng nhập
              </Button>
              <Button className="rounded-full">Đăng ký</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
