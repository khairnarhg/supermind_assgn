
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";
import Anuj from '@/public/images/anuj.png'
import Joel from '@/public/images/joel.png'
import Harsh from '@/public/images/harsh.png'

const teamMembers = [
  { name: 'Anuj Kadu', image: Anuj },
  { name: 'Joel Mathew Job', image: Joel },
  { name: 'Harsh Khairnar', image: Harsh },
];

export default function Footer() {
  return (
    <footer>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6 -top-10">
        {/* Footer illustration */}
        <div
          className="absolute bottom-0 -translate-x-1/2 pointer-events-none left-1/2 -z-10"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="grid grid-cols-2 justify-between gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          
          {/* Team member section */}
          <div className="col-span-full md:col-span-4 lg:col-span-5">
          <div className="max-w-3xl pb-12 mx-auto text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Team 3 Musketeers
          </h2>
          
        </div>
            <div className="flex justify-between">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                <div 
                    className="w-[200px] h-[200px] mb-2 overflow-hidden rounded-full border-2 border-white"
                >
                    <Image
                        src={member.image}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                </div>
                <p className="text-xl text-white">{member.name}</p>
            </div>
            
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

