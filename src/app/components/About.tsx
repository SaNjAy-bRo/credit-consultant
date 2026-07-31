'use client';

import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "./routerShim";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest standards of integrity in all our actions.",
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Our clients' success is our success. We put you first, always.",
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "We strive for excellence in everything we do.",
    },
    {
      icon: Award,
      title: "Expertise",
      description: "Our team brings deep knowledge and experience to every case.",
    },
  ];

  const achievements = [
    "Certified Credit Consultants",
    "15+ Years of Experience",
    "10,000+ Satisfied Clients",
    "98% Success Rate",
    "Member of Indian Credit Association",
    "ISO 9001:2015 Certified",
  ];

  const team = [
    {
      name: "Anand B",
      role: "Operations Head",
      description: "Oversees daily credit repair operations, bureau SLA tracking, and quality management.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Vivekanand S",
      role: "Acquisition Team Head",
      description: "Leads client onboarding, financial growth strategy, and strategic institutional partnerships.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Nandeesh",
      role: "Service Team Head",
      description: "Manages client dispute resolution workflows, bureau communications, and advisory services.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Kaustubha",
      role: "Administration Manager",
      description: "Manages operational compliance, office administration, and client documentation processing.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Shruti",
      role: "Administration Head",
      description: "Heads administrative governance, executive coordination, and service quality control.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Harsh M",
      role: "IT Head",
      description: "Leads technology infrastructure, secure client portal architecture, and data privacy.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="w-full">
      <SEOHead
        title="About Credit Consultant — India's Trusted Credit Repair Experts"
        description="15+ years of experience helping 10,000+ Indians repair their CIBIL scores and access the best loans. Meet our expert team of financial advisors based in Bengaluru."
        keywords="about credit consultant, credit repair experts India, CIBIL score advisors, financial consultants Bengaluru"
        schema={ORG_SCHEMA}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Who We Are
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">Credit Consultant</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 font-normal leading-relaxed">
              Your trusted partner in credit repair and financial wellness since 2011
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Est. 2011</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-base">
                <p>
                  Credit Consultant was founded in 2011 with a simple mission: to help individuals and businesses achieve financial freedom through better credit management.
                </p>
                <p>
                  What started as a small consulting firm has grown into one of India's most trusted credit repair and financial consulting services. We've helped over 10,000 clients improve their credit scores and achieve their financial dreams.
                </p>
                <p>
                  Our team of certified credit consultants and financial experts brings decades of combined experience to every client engagement. We stay up-to-date with the latest credit laws, regulations, and best practices to ensure you receive the most effective solutions.
                </p>
                <p>
                  Today, we continue to innovate and expand our services while maintaining the personalized, client-focused approach that has been our hallmark from day one.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 filter blur-lg -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1764231467854-db276777da58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NzQ4MDg0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our Team"
                className="rounded-3xl shadow-xl w-full h-[480px] object-cover border border-slate-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-teal-600 shadow-inner">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  To empower individuals and businesses to achieve financial freedom through expert credit repair, financial education, and personalized consulting services. We are committed to providing transparent, ethical, and effective solutions that make a real difference in our clients' lives.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-teal-600 shadow-inner">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  To be India's leading credit repair and financial consulting firm, recognized for our integrity, expertise, and unwavering commitment to client success. We envision a future where every individual has access to the knowledge and resources needed to maintain excellent credit and achieve financial wellness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Our DNA</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-500/15 to-emerald-500/15 filter blur-lg -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc0Nzg2MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Achievements"
                className="rounded-3xl shadow-xl w-full h-[420px] object-cover border border-slate-100"
              />
            </div>
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Proven Track Record</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Our Achievements
              </h2>
              <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed">
                We're proud of what we've accomplished and the trust our clients place in us.
              </p>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-800 font-medium text-base">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Leadership</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-7">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Work With Us?
          </h2>
          <p className="text-base lg:text-xl mb-8 text-teal-100/90 max-w-2xl mx-auto font-normal">
            Join thousands of satisfied clients who have transformed their financial lives with our help
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-sky-300 hover:text-white underline underline-offset-4 font-extrabold text-lg hover:no-underline transition-all py-2 px-1">
            <span>Get Your Free Consultation</span>
            <ArrowRight className="w-5 h-5 text-sky-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
