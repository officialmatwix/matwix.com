"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { Award, Download, Calendar, CheckCircle } from "lucide-react"

// Mock data for certificates
const mockCertificates = [
  {
    id: "cert-1",
    title: {
      en: "Network Marketing Fundamentals",
      es: "Fundamentos de Marketing en Red",
    },
    issueDate: "2023-08-10T00:00:00Z",
    validUntil: "2026-08-10T00:00:00Z",
    instructor: "John Smith",
    credentialId: "NMF-2023-12345",
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
            <Card key={certificate.id} className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-slate-100">{certificate.title[language]}</CardTitle>
                  <p className="text-sm text-slate-400">{certificate.instructor}</p>
                </div>
                <Award className="h-10 w-10 text-amber-500" />
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
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-300">
                      {t("credentialId")}: {certificate.credentialId}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <Download className="h-4 w-4 mr-2" />
                  {t("downloadCertificate")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400">{t("noCertificatesFound")}</p>
          <p className="text-slate-500 mt-2">{t("completeCourseToEarn")}</p>
        </div>
      )}
    </div>
  )
}

