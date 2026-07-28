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
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-lg lg:text-xl text-teal-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your credit concerns..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
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
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a href={info.link} className="text-gray-600 hover:text-blue-600 transition-colors">
                              {info.content}
                            </a>
                          ) : (info as any).hours ? (
                            <div className="space-y-1.5 mt-1">
                              {(info as any).hours.map((h: { day: string; time: string; open: boolean }) => (
                                <div key={h.day} className="flex items-center justify-between gap-6 text-sm">
                                  <span className="text-gray-500 w-24">{h.day}</span>
                                  <span className={`font-medium ${h.open ? "text-gray-800" : "text-red-400"}`}>
                                    {h.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">{info.content}</p>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Us Here
            </h2>
            <p className="text-lg text-gray-600">
              Visit our office for a face-to-face consultation
            </p>
          </div>
          <div className="rounded-xl overflow-hidden h-[400px] shadow-lg">
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
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
            Schedule Your Free Consultation
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
            Don't wait to improve your credit score. Book a free consultation with our experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919538049888">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                <Phone className="mr-2 w-5 h-5" />
                Call Now: +91 95380 49888
              </Button>
            </a>
            <a href="mailto:accounts@creditconsultant.in">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
