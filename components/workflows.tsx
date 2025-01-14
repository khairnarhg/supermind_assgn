"use client"
import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import Spotlight from "@/components/spotlight";
import Link from 'next/link';
import { useState } from "react";
import Loader from '@/components/loader';

export default function Workflows() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  return (  
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6" id="app-features-land">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex text-transparent bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text">
                Tailored Features
              </span>
            </div>
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-200">
              Our Powerful Analytics Tools
            </h2>
            <p className="text-lg text-indigo-200/65">
              Rich and Elegant interface with chatbots which can handle multilingual queries, Interactive Realtime Graphs, and Realtime Social media analytics of User provided file.
            </p>
          </div>

          {/* Spotlight items */}
          <Spotlight className="grid items-start max-w-sm gap-6 mx-auto group lg:max-w-none lg:grid-cols-3">
            {/* Card 1 */}
            <Link href="/GlobalAnalytics" prefetch onClick={handleClick} className="relative h-full p-px overflow-hidden bg-gray-800 group/card rounded-2xl">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image src={WorflowImg01} width={350} height={288} alt="Workflow 01" />
                <div className="p-6">
                <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="text-transparent bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text">
                        Global Analytics
                      </span>
                    </span>
                  </div>
                  <p className="text-indigo-200/65">Gives an overall view on Social Analytics where the user can ask any question they want to get relevant answers.</p>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/csv" prefetch onClick={handleClick} className="relative h-full p-px overflow-hidden bg-gray-800 group/card rounded-2xl">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image src={WorflowImg02} width={350} height={288} alt="Workflow 02" />
                <div className="p-6">
                <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="text-transparent bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text">
                        Analyze CSV
                      </span>
                    </span>
                  </div>
                  <p className="text-indigo-200/65">Give verbal insights explaining data to users and showcasing interactable graphs for easy visualization.</p>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/realtime" prefetch onClick={handleClick} className="relative h-full p-px overflow-hidden bg-gray-800 group/card rounded-2xl">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image src={WorflowImg03} width={350} height={288} alt="Workflow 03" />
                <div className="p-6">
                <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="text-transparent bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text">
                        RealTime Analytics
                      </span>
                    </span>
                  </div>
                  <p className="text-indigo-200/65">Gives real-time analysis and visualization of data from a live user account.</p>
                </div>
              </div>
            </Link>
          </Spotlight>

          {/* Loading Indicator */}
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              {/* <p className="text-lg text-white">Loading...</p> */}
              <Loader/>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
