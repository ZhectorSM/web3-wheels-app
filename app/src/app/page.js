"use client";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card
} from "@/components/ui/card";
import CarIcon from "@/components/icons/car";
import CalendarIcon from "@/components/icons/calendar";
import WalletIcon from "@/components/icons/wallet";
import DollarSignIcon from "@/components/icons/dollar-sign";
import TruckIcon from "@/components/icons/truck";
import UsersIcon from "@/components/icons/users";
import Spline from "@splinetool/react-spline";
import getScene from "@/utils/3dModel";
import { useState } from "react";

export default function Home() {
  const sceneURL = getScene();
  const [loading, setLoading] = useState(true);

  const show = () => {
    setTimeout(setLoading(false), 3000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <p>Loading...</p>
        </div>
      )}
      <main
        className={`flex-1 z-10 ${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      >
        <section className="relative w-full h-screen bg-transparent select-none py-16 md:py-24 lg:py-32 xl:py-44 z-10">
          <Spline
            scene={sceneURL}
            className="absolute w-full h-full inset-0 z-0 transition-opacity duration-3000"
            onLoad={() => show()}
          />
          <div className="container relative z-20 opacity-95 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-3 px-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-zinc-50 tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Autonomous Car for the Future
                  </h1>
                  <p className="max-w-[600px] text-zinc-100 md:text-xl dark:text-gray-100">
                    Web3 Wheels allows car dealers to mint car NFTs that are
                    autonomous vehicles driven by AI. Customers can book a ride
                    and the AI model will use those cars and their operating
                    mode to decide which car will pick the customer.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-teal-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-gray-300"
                    href="/book-ride"
                  >
                    Book a Ride
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
                    href="/car-shop"
                  >
                    Car Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 z-20 md:py-32 lg:py-48 bg-gradient-to-b from-teal-900 to-zinc-50 dark:bg-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Autonomous Vehicles at Your Fingertips
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                    Simply book a ride and our AI model will decide which
                    autonomous vehicle to send to pick you up. No more waiting
                    for a driver, the car will come to you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Book Now
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              {/* <Image
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg"
                width="550"
              /> */}
            </div>
          </div>
        </section>
        <section className="w-full z-20 py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                Web3 Wheels offers a range of innovative features to
                revolutionize the car buying and riding experience.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CarIcon className="w-8 h-8" />
                  <div className="grid gap-1">
                    <CardTitle>Autonomous Driving</CardTitle>
                    <CardDescription>
                      Our cars are powered by advanced AI technology, allowing
                      them to navigate the roads safely and efficiently.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CalendarIcon className="w-8 h-8" />
                  <div className="grid gap-1">
                    <CardTitle>Seamless Booking</CardTitle>
                    <CardDescription>
                      Book a ride with just a few taps, and our AI will dispatch
                      the nearest available vehicle to your location.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <WalletIcon className="w-8 h-8" />
                  <div className="grid gap-1">
                    <CardTitle>NFT Ownership</CardTitle>
                    <CardDescription>
                      Car dealers can mint their vehicles as NFTs, allowing them
                      to track ownership and earn royalties on every ride.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full z-20 py-12 md:py-24 lg:py-32 border-t dark:border-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Benefits for Car Dealers
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                Web3 Wheels offers a range of benefits for car dealers,
                including increased revenue, reduced overhead, and a new way to
                engage with customers.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <DollarSignIcon className="w-8 h-8" />
                  <div className="grid gap-1">
                    <CardTitle>Increased Revenue</CardTitle>
                    <CardDescription>
                      Earn royalties on every ride taken in your NFT vehicles,
                      and reach a wider customer base.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <TruckIcon className="w-8 h-8" />
                  <div className="grid gap-1">
                    <CardTitle>Reduced Overhead</CardTitle>
                    <CardDescription>
                      No more maintenance costs or insurance for your fleet, as
                      the autonomous vehicles take care of themselves.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <UsersIcon className="w-8 h-8" />
                  <div className="grid gap-1">
                    <CardTitle>Customer Engagement</CardTitle>
                    <CardDescription>
                      Offer your customers a unique and innovative way to
                      experience your vehicles, building brand loyalty.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Web3 Wheels. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
