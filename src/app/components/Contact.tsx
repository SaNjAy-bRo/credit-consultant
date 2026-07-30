'use client';

import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "184, 15, 5th Main Rd, near police station, 4th Block, Jayanagar, Bengaluru, Karnataka 560011",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 95380 49888",
      link: "tel:+919538049888",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "accounts@creditconsultant.in",
      link: "mailto:accounts@creditconsultant.in",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "",
      hours: [
        { day: "Mon – Fri", time: "9:00 AM – 6:00 PM", open: true },
        { day: "Saturday",  time: "9:00 AM – 2:00 PM",  open: true },
        { day: "Sunday",    time: "Closed",              open: false },
      ],
    },
  ];

  const faqs = [
    {
      question: "How long does credit repair take?",
      answer: "Typically, you can see results in 3-6 months, depending on your specific situation.",
    },
    {
      question: "Is credit repair legal?",
      answer: "Yes, credit repair is completely legal. We follow all regulations set by credit bureaus and consumer protection laws.",
    },
    {
      question: "What is your success rate?",
      answer: "We have a 98% success rate in helping clients improve their credit scores.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer: "Yes, if we don't achieve results within the agreed timeframe, we offer a full refund.",
    },
  ];

  return (
    <div className="w-full">
      <SEOHead
        title="Contact Credit Consultant — Free Credit Repair Consultation"
        description="Get in touch with India's leading credit advisory team. Free consultation, no hidden fees. Call +91 95380 49888 or email accounts@creditconsultant.in. Office in Jayanagar, Bengaluru."
        keywords="contact credit consultant, free credit consultation, credit repair Bengaluru, CIBIL score help"
        schema={ORG_SCHEMA}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            We're Here to Help
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Touch</span>
          </h1>
          <p className="text-lg lg:text-xl text-teal-100/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-xl p-2">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900">Send Us a Message</CardTitle>
                  <CardDescription className="text-slate-500 text-base">
                    Fill out the form below and our team will get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="rounded-xl border-slate-300 focus:ring-2 focus:ring-teal-500 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="rounded-xl border-slate-300 focus:ring-2 focus:ring-teal-500 h-11"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="rounded-xl border-slate-300 focus:ring-2 focus:ring-teal-500 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                          className="rounded-xl border-slate-300 focus:ring-2 focus:ring-teal-500 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-slate-700">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your credit concerns..."
                        rows={6}
                        required
                        className="rounded-xl border-slate-300 focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl h-12 shadow-lg shadow-teal-600/30">
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-teal-600 shadow-inner">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1 text-base">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a href={info.link} className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium">
                              {info.content}
                            </a>
                          ) : (info as any).hours ? (
                            <div className="space-y-1.5 mt-1">
                              {(info as any).hours.map((h: { day: string; time: string; open: boolean }) => (
                                <div key={h.day} className="flex items-center justify-between gap-6 text-xs">
                                  <span className="text-slate-500 font-medium w-20">{h.day}</span>
                                  <span className={`font-semibold ${h.open ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full" : "text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full"}`}>
                                    {h.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-600 text-sm leading-relaxed">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Our Office</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Find Us Here
            </h2>
            <p className="text-base lg:text-lg text-slate-600">
              Visit our office for a face-to-face consultation
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden h-[420px] shadow-2xl border border-slate-200">
            <iframe
              title="Credit Consultant Jayanagar Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5837!3d12.9279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s184%2C%2015%2C%205th%20Main%20Rd%2C%204th%20Block%2C%20Jayanagar%2C%20Bengaluru%2C%20Karnataka%20560011!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Common Queries</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base lg:text-lg text-slate-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-slate-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
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
            Schedule Your Free Consultation
          </h2>
          <p className="text-base lg:text-xl mb-8 text-teal-100/90 max-w-2xl mx-auto font-normal">
            Don't wait to improve your credit score. Book a free consultation with our experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+919538049888">
              <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold rounded-xl shadow-xl shadow-teal-950/50">
                <Phone className="mr-2 w-5 h-5 text-teal-700" />
                Call Now: +91 95380 49888
              </Button>
            </a>
            <a href="mailto:accounts@creditconsultant.in">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-xl">
                <Mail className="mr-2 w-5 h-5" />
                accounts@creditconsultant.in
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
