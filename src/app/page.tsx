"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero / Banner */}
      <section className="min-h-[80vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-10 py-16">
        {/* Left Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empower Your Team with <br />
            <span className="text-primary">Smart Product Management</span>
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Plan, track, and manage your product development like never before.
            Stay organized, collaborate efficiently, and hit your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link href="/products-list">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-md lg:max-w-xl">
          <Image
            src="/product.jpg"
            alt="Product Management Illustration"
            className="w-full h-auto"
            width={500}
            height={500}
          />
        </div>
      </section>
      <br />
    </main>
  );
}

export default HomePage;
