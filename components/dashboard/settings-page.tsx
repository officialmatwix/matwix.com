"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { User, Lock, Bell, Globe, Network, Save, Trash2, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/language-context"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{t("settings")}</h1>
        <p className="text-slate-400 mt-1">{t("manageYourAccountSettings")}</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-slate-800/50 p-1 mb-6">
          <TabsTrigger value="account" className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400">
            <User className="h-4 w-4 mr-2" />
            {t("account")}
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
          >
            <Lock className="h-4 w-4 mr-2" />
            {t("security")}
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
          >
            <Bell className="h-4 w-4 mr-2" />
            {t("notifications")}
          </TabsTrigger>
          <TabsTrigger
            value="language"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
          >
            <Globe className="h-4 w-4 mr-2" />
            {t("language")}
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400">
            <Network className="h-4 w-4 mr-2" />
            {t("networkSettings")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("profileInformation")}</CardTitle>
              <CardDescription>{t("updateYourProfileDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="bg-slate-700 text-slate-300 text-xl">NA</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    {t("changeAvatar")}
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("firstName")}</Label>
                    <Input id="firstName" defaultValue="Neo" className="bg-slate-800 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("lastName")}</Label>
                    <Input id="lastName" defaultValue="Anderson" className="bg-slate-800 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="neo@matrix.com"
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-slate-800 pt-6">
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("deleteAccount")}
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? t("saving") : t("saveChanges")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("changePassword")}</CardTitle>
              <CardDescription>{t("updateYourPassword")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t("currentPassword")}</Label>
                <Input id="currentPassword" type="password" className="bg-slate-800 border-slate-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t("newPassword")}</Label>
                <Input id="newPassword" type="password" className="bg-slate-800 border-slate-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input id="confirmPassword" type="password" className="bg-slate-800 border-slate-700" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button className="ml-auto" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? t("updating") : t("updatePassword")}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("twoFactorAuthentication")}</CardTitle>
              <CardDescription>{t("enhanceYourAccountSecurity")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-200">{t("enableTwoFactor")}</p>
                  <p className="text-sm text-slate-400">{t("twoFactorDescription")}</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("sessionManagement")}</CardTitle>
              <CardDescription>{t("manageYourActiveSessions")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div>
                    <p className="font-medium text-slate-200">{t("currentSession")}</p>
                    <p className="text-sm text-slate-400">Chrome on Windows • IP 192.168.1.1</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{t("active")}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div>
                    <p className="font-medium text-slate-200">{t("mobileSession")}</p>
                    <p className="text-sm text-slate-400">Safari on iPhone • IP 192.168.1.2</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-400/10">
                    {t("revoke")}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button variant="destructive" className="ml-auto">
                <LogOut className="h-4 w-4 mr-2" />
                {t("logoutAllDevices")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("notificationPreferences")}</CardTitle>
              <CardDescription>{t("manageHowYouReceiveNotifications")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("emailNotifications")}</p>
                    <p className="text-sm text-slate-400">{t("receiveEmailsAboutActivity")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("pushNotifications")}</p>
                    <p className="text-sm text-slate-400">{t("receivePushNotifications")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("smsNotifications")}</p>
                    <p className="text-sm text-slate-400">{t("receiveSmsNotifications")}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("notificationTypes")}</CardTitle>
              <CardDescription>{t("customizeWhichNotificationsYouReceive")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("teamUpdates")}</p>
                    <p className="text-sm text-slate-400">{t("notificationsAboutYourTeam")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("commissionAlerts")}</p>
                    <p className="text-sm text-slate-400">{t("notificationsAboutCommissions")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("rankAdvancement")}</p>
                    <p className="text-sm text-slate-400">{t("notificationsAboutRankChanges")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("systemAnnouncements")}</p>
                    <p className="text-sm text-slate-400">{t("importantSystemUpdates")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">{t("marketingUpdates")}</p>
                    <p className="text-sm text-slate-400">{t("promotionsAndSpecialOffers")}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button className="ml-auto" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? t("saving") : t("savePreferences")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("languagePreferences")}</CardTitle>
              <CardDescription>{t("chooseYourPreferredLanguage")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t("selectLanguage")}</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "es")}>
                  <SelectTrigger id="language" className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder={t("selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="en" className="text-slate-200">
                      <div className="flex items-center">
                        <span className="mr-2">🇺🇸</span> English
                      </div>
                    </SelectItem>
                    <SelectItem value="es" className="text-slate-200">
                      <div className="flex items-center">
                        <span className="mr-2">🇪🇸</span> Español
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <p className="text-sm text-slate-400">{t("languageChangeNote")}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button className="ml-auto" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? t("saving") : t("savePreferences")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>{t("networkDisplaySettings")}</CardTitle>
              <CardDescription>{t("customizeHowYourNetworkIsDisplayed")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="networkView">{t("defaultNetworkView")}</Label>
                <Select defaultValue="tree">
                  <SelectTrigger id="networkView" className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder={t("selectView")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="tree" className="text-slate-200">
                      {t("treeView")}
                    </SelectItem>
                    <SelectItem value="list" className="text-slate-200">
                      {t("listView")}
                    </SelectItem>
                    <SelectItem value="matrix" className="text-slate-200">
                      {t("matrixView")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="networkDepth">{t("networkDisplayDepth")}</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="networkDepth" className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder={t("selectDepth")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="1" className="text-slate-200">
                      1 {t("level")}
                    </SelectItem>
                    <SelectItem value="2" className="text-slate-200">
                      2 {t("levels")}
                    </SelectItem>
                    <SelectItem value="3" className="text-slate-200">
                      3 {t("levels")}
                    </SelectItem>
                    <SelectItem value="4" className="text-slate-200">
                      4 {t("levels")}
                    </SelectItem>
                    <SelectItem value="5" className="text-slate-200">
                      5 {t("levels")}
                    </SelectItem>
                    <SelectItem value="all" className="text-slate-200">
                      {t("allLevels")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-medium text-slate-200">{t("showInactiveMembers")}</p>
                  <p className="text-sm text-slate-400">{t("displayInactiveMembersInNetwork")}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button className="ml-auto" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? t("saving") : t("saveSettings")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
