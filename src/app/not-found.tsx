import Image from 'next/image';
import Link from 'next/link';
import spaceMan from '../../public/images/SpaceMan.svg';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <main className="flex flex-row items-center justify-evenly">
        <div className="mr-96 text-left text-notfound-white">
          <h1 className="text-inter text-[200px] font-bold">Oops !</h1>
          <h3 className="text-inter text-[44px] font-bold">something went wrong...</h3>
          <p className="text-inter mb-52 text-[23px] font-normal text-notfound-gray">
            try to reload this page or go back to the homepage
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-2 border-notfound-white bg-transparent px-8 py-6 text-lg text-notfound-white hover:text-red-600"
          >
            <Link href="/">
              <MoveLeft />
              homepage
            </Link>
          </Button>
        </div>
        <div>
          <Image src={spaceMan} alt="Astronaut on Moon" width={477} height={477} />
        </div>
      </main>
    </div>
  );
}
