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
      name: "Vikram Mehta",
      role: "Founder & CEO",
      description: "15+ years experience in credit repair and financial consulting",
      image: "https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGJ1c2luZXNzJTIwY29uc3VsdGFudHxlbnwxfHx8fDE3NzQ4Nzg4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Anjali Reddy",
      role: "Head of Credit Analysis",
      description: "Expert in credit report analysis and dispute resolution",
      image: "https://images.unsplash.com/photo-1739298061766-e2751d92e9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzQ4MzkxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Suresh Kumar",
      role: "Financial Planning Director",
      description: "Specializes in debt management and financial planning",
      image: "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzQ4NjQ1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About Credit Consultant
            </h1>
            <p className="text-lg lg:text-xl text-teal-100 max-w-3xl mx-auto">
              Your trusted partner in credit repair and financial wellness since 2011
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
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
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1764231467854-db276777da58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NzQ4MDg0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our Team"
                className="rounded-lg shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To empower individuals and businesses to achieve financial freedom through expert credit repair, financial education, and personalized consulting services. We are committed to providing transparent, ethical, and effective solutions that make a real difference in our clients' lives.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be India's leading credit repair and financial consulting firm, recognized for our integrity, expertise, and unwavering commitment to client success. We envision a future where every individual has access to the knowledge and resources needed to maintain excellent credit and achieve financial wellness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc0Nzg2MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Achievements"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Achievements
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're proud of what we've accomplished and the trust our clients place in us.
              </p>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have transformed their financial lives with our help
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
              Get Your Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
