"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { Award, Download, Calendar, Shield } from "lucide-react"

// Mock data for certificates
const mockCertificates = [
  {
    id: "cert-1",
    title: {
      en: "Quantum Network Marketing Fundamentals",
      es: "Fundamentos de Marketing en Red Cuántico",
    },
    issueDate: "2023-08-10T00:00:00Z",
    validUntil: "2026-08-10T00:00:00Z",
    instructor: "John Smith",
    credentialId: "NMF-2023-12345",
    skills: ["Network Marketing", "Business Development", "Team Building"],
  },
  {
    id: "cert-2",
    title: {
      en: "Quantum Compensation Plans",
      es: "Planes de Compensación Cuánticos",
    },
    issueDate: "2023-09-15T00:00:00Z",
    validUntil: "2026-09-15T00:00:00Z",
    instructor: "David Wilson",
    credentialId: "QCP-2023-67890",
    skills: ["Compensation Plans", "Financial Analysis", "Business Strategy"],
  },
]

export default function Certificates() {
  const { language, t } = useLanguage()

  // Format date to locale string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-100">{t("yourCertificates")}</h2>

      {mockCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCertificates.map((certificate) => (
            <Card key={certificate.id} className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full" />

              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-slate-100">{certificate.title[language]}</CardTitle>
                  <p className="text-sm text-slate-400">{certificate.instructor}</p>
                </div>
                <Award className="h-10 w-10 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-slate-300">
                      {t("issueDate")}: {formatDate(certificate.issueDate)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span className="text-slate-300">
                      {t("validUntil")}: {formatDate(certificate.validUntil)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <span className="text-slate-300">
                      {t("credentialId")}: {certificate.credentialId}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  <Download className="h-4 w-4 mr-2" />
                  {t("downloadCertificate")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <p className="text-slate-400">{t("noCertificatesFound")}</p>
          <p className="text-slate-500 mt-2">{t("completeCourseToEarn")}</p>
        </div>
      )}
    </div>
  )
}
