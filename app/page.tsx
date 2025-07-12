"use client"

import { useState, useEffect, useRef } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Menu, X, Phone, Mail, MapPin, Leaf, Zap, Home, Users, Award, Clock } from "lucide-react"
import Image from "next/image"

import { submitContactForm } from "./actions/contact"

// Hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible] as const
}

export default function RinnovaItaliaWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const [heroRef, heroVisible] = useScrollAnimation()
  const [aboutRef, aboutVisible] = useScrollAnimation()
  const [servicesRef, servicesVisible] = useScrollAnimation()
  const [locationRef, locationVisible] = useScrollAnimation()
  const [contactRef, contactVisible] = useScrollAnimation()
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo-rinnova-italia.png"
                alt="Rinnova Italia Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-[#40a644]">Rinnova Italia</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-[#40a644] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("chi-siamo")}
                className="text-gray-700 hover:text-[#40a644] transition-colors"
              >
                Chi Siamo
              </button>
              <button
                onClick={() => scrollToSection("servizi")}
                className="text-gray-700 hover:text-[#40a644] transition-colors"
              >
                Servizi
              </button>
              <button
                onClick={() => scrollToSection("posizione")}
                className="text-gray-700 hover:text-[#40a644] transition-colors"
              >
                Dove Siamo
              </button>
              <button
                onClick={() => scrollToSection("contatti")}
                className="text-gray-700 hover:text-[#40a644] transition-colors"
              >
                Contatti
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block px-3 py-2 text-gray-700 hover:text-[#40a644] w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("chi-siamo")}
                  className="block px-3 py-2 text-gray-700 hover:text-[#40a644] w-full text-left"
                >
                  Chi Siamo
                </button>
                <button
                  onClick={() => scrollToSection("servizi")}
                  className="block px-3 py-2 text-gray-700 hover:text-[#40a644] w-full text-left"
                >
                  Servizi
                </button>
                <button
                  onClick={() => scrollToSection("posizione")}
                  className="block px-3 py-2 text-gray-700 hover:text-[#40a644] w-full text-left"
                >
                  Dove Siamo
                </button>
                <button
                  onClick={() => scrollToSection("contatti")}
                  className="block px-3 py-2 text-gray-700 hover:text-[#40a644] w-full text-left"
                >
                  Contatti
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            ref={heroRef}
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Rinnova Italia: <span className="text-[#40a644]">Efficienza</span>,{" "}
                <span className="text-[#40a644]">Sostenibilità</span>,{" "}
                <span className="text-[#40a644]">Innovazione</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Il tuo partner di fiducia per l'efficienza energetica a Roma. Trasformiamo la tua casa in un ambiente
                più sostenibile e conveniente.
              </p>
              <Button
                onClick={() => scrollToSection("contatti")}
                className="bg-[#40a644] hover:bg-[#40a644]/90 text-white px-8 py-3 text-lg"
              >
                Contattaci Ora
              </Button>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/esterno-negozio.jpg"
                  alt="Sede Rinnova Italia - Piazzale Clodio 9, Roma"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo Section */}
      <section id="chi-siamo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={aboutRef}
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${
              aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chi Siamo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Situati nel cuore di Prati a Roma, Rinnova Italia è il nuovo centro dedicato all'efficienza energetica. Il
              nostro obiettivo è promuovere soluzioni innovative e sostenibili per ridurre i consumi energetici e
              migliorare la qualità della vita.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-400 ${
              aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#40a644] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Esperienza</h3>
              <p className="text-gray-600">Anni di esperienza nel settore dell'efficienza energetica</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#40a644] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clienti Soddisfatti</h3>
              <p className="text-gray-600">Centinaia di famiglie hanno migliorato la loro efficienza energetica</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#40a644] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sostenibilità</h3>
              <p className="text-gray-600">Soluzioni eco-friendly per un futuro più verde</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#40a644] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Supporto 24/7</h3>
              <p className="text-gray-600">Assistenza continua per tutti i nostri clienti</p>
            </div>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-600 ${
              aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I Nostri Valori</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#40a644] mb-2">Sostenibilità</h4>
                  <p className="text-gray-600">
                    Crediamo in un futuro più verde e lavoriamo per ridurre l'impatto ambientale attraverso soluzioni
                    innovative.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#40a644] mb-2">Innovazione</h4>
                  <p className="text-gray-600">
                    Utilizziamo le tecnologie più avanzate per offrire soluzioni all'avanguardia nel campo
                    dell'efficienza energetica.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#40a644] mb-2">Efficienza</h4>
                  <p className="text-gray-600">
                    Ottimizziamo ogni aspetto per garantire il massimo risparmio energetico e la migliore qualità del
                    servizio.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/ufficio-consultazione.jpg"
                  alt="Ufficio Rinnova Italia - Ambiente professionale per consulenze"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi Section */}
      <section id="servizi" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={servicesRef}
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">I Nostri Servizi</h2>
            <p className="text-xl text-gray-600">Soluzioni complete per l'efficienza energetica della tua casa</p>
          </div>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 delay-400 ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#40a644] rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Consulenza Energetica</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analisi dettagliata dei consumi energetici e consulenze personalizzate per ottimizzare l'efficienza
                  della tua abitazione.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#40a644] rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Ristrutturazioni</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ristrutturazioni mirate all'efficienza energetica con materiali eco-sostenibili e tecnologie
                  innovative.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#40a644] rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Prodotti Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fornitura di prodotti eco-friendly e sistemi di risparmio energetico per ridurre i consumi di gas e
                  luce.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#40a644] rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Supporto Continuo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Assistenza e supporto continuo per guidarti nel processo di transizione energetica verso l'efficienza.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-600 ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/ufficio-scrivania.jpg"
                alt="Ufficio moderno Rinnova Italia - Spazio di lavoro professionale"
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/ufficio-parete-verde.jpg"
                alt="Ufficio Rinnova Italia con parete verde brandizzata"
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posizione Section */}
      <section id="posizione" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={locationRef}
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${
              locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dove Siamo</h2>
            <p className="text-xl text-gray-600">Ci trovi nel cuore di Roma, nel quartiere Prati</p>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-400 ${
              locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">La Nostra Sede</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-[#40a644] mt-1" />
                    <div>
                      <p className="font-semibold">Indirizzo</p>
                      <p className="text-gray-600">Piazzale Clodio 9, Roma, Italia</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-[#40a644] mt-1" />
                    <div>
                      <p className="font-semibold">Orari di Apertura</p>
                      <p className="text-gray-600">Lun-Ven: 9:00-18:00</p>
                      <p className="text-gray-600">Sab: 9:00-13:00</p>
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-6 bg-[#40a644] hover:bg-[#40a644]/90"
                  onClick={() => window.open("https://maps.google.com/?q=Piazzale+Clodio+9,+Roma", "_blank")}
                >
                  Visualizza su Google Maps
                </Button>
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.123456789!2d12.4567890!3d41.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPiazzale%20Clodio%209%2C%20Roma!5e0!3m2!1sit!2sit!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Rinnova Italia - Piazzale Clodio 9, Roma"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti Section */}
      <section id="contatti" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={contactRef}
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${
              contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contattaci</h2>
            <p className="text-xl text-gray-600">Inizia oggi il tuo percorso verso l'efficienza energetica</p>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 delay-400 ${
              contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Invia un Messaggio</h3>
              <form action={formAction} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <Input id="nome" name="nome" type="text" required />
                  </div>
                  <div>
                    <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-2">
                      Cognome *
                    </label>
                    <Input id="cognome" name="cognome" type="text" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono
                  </label>
                  <Input id="telefono" name="telefono" type="tel" />
                </div>
                <div>
                  <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-2">
                    Messaggio *
                  </label>
                  <Textarea id="messaggio" name="messaggio" rows={5} required />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#40a644] hover:bg-[#40a644]/90 disabled:opacity-50"
                >
                  {isPending ? "Invio in corso..." : "Invia Messaggio"}
                </Button>

                {state && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      state.success
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    <p className="font-medium">{state.message}</p>
                  </div>
                )}
              </form>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informazioni di Contatto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#40a644] mt-1" />
                  <div>
                    <p className="font-semibold">Telefono</p>
                    <a href="tel:+390612345678" className="text-[#40a644] hover:underline">
                      +39 06 1234 5678
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#40a644] mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:commerciale@rinnovaitalia.it" className="text-[#40a644] hover:underline">
                      commerciale@rinnovaitalia.it
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#40a644] mt-1" />
                  <div>
                    <p className="font-semibold">Indirizzo</p>
                    <p className="text-gray-600">
                      Piazzale Clodio 9<br />
                      00195 Roma, Italia
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Dati Aziendali</h4>
                <p className="text-sm text-gray-600">P.IVA: 12345678901</p>
                <p className="text-sm text-gray-600">Codice Fiscale: 12345678901</p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Inviando questo modulo accetti la nostra{" "}
                  <a href="#" className="text-[#40a644] hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/logo-rinnova-italia.png"
                  alt="Rinnova Italia Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-xl font-bold">Rinnova Italia</span>
              </div>
              <p className="text-gray-400">
                Il tuo partner di fiducia per l'efficienza energetica a Roma. Trasformiamo la tua casa in un ambiente
                più sostenibile.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Link Utili</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("chi-siamo")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Chi Siamo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servizi")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Servizi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contatti")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contatti
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contatti</h4>
              <div className="space-y-2">
                <p className="text-gray-400">Piazzale Clodio 9, Roma</p>
                <p className="text-gray-400">Tel: +39 06 1234 5678</p>
                <p className="text-gray-400">Email: commerciale@rinnovaitalia.it</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Rinnova Italia. Tutti i diritti riservati.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
