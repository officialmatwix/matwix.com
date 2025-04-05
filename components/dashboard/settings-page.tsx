"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Update the imports to include the necessary icons and components
import {
  Bell,
  User,
  Lock,
  CreditCard,
  Save,
  Upload,
  Check,
  AlertTriangle,
  FileCheck,
  Settings,
  Search,
  Video,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Add this component function before the main SettingsPage component
function VerificationStep({
  step,
  status,
  message,
}: {
  step: string
  status: string
  message: string
}) {
  return (
    <div className="flex items-start">
      {status === "completed" ? (
        <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-3">
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
      ) : status === "in_progress" ? (
        <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 mr-3">
          <Clock className="h-4 w-4 text-amber-500" />
        </div>
      ) : status === "failed" ? (
        <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
          <XCircle className="h-4 w-4 text-red-500" />
        </div>
      ) : (
        <div className="h-6 w-6 rounded-full bg-slate-700/50 flex items-center justify-center mt-0.5 mr-3">
          <Clock className="h-4 w-4 text-slate-500" />
        </div>
      )}
      <div>
        <div className="text-sm text-slate-300">{step}</div>
        <div className="text-xs text-slate-400">{message}</div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    bio: "MLM professional with 5+ years of experience in network marketing. Passionate about helping others succeed in their business.",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    teamUpdates: true,
    commissionAlerts: true,
    rankChanges: true,
    promotions: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethod: "direct_deposit",
    accountName: "John Doe",
    accountNumber: "****4567",
    routingNumber: "****8901",
    autoWithdraw: false,
    minWithdrawAmount: "100",
  })

  // Update the state variables to include reference ID and verification steps
  const [kycStatus, setKycStatus] = useState<"not_started" | "pending" | "verified" | "rejected">("not_started")
  const [kycDocuments, setKycDocuments] = useState({
    idCard: false,
    proofOfAddress: false,
    selfie: false,
  })
  const [referenceId, setReferenceId] = useState<string>("")
  const [searchReferenceId, setSearchReferenceId] = useState<string>("")
  const [showStatusCheck, setShowStatusCheck] = useState(false)
  const [verificationSteps, setVerificationSteps] = useState({
    documentSubmission: { status: "not_started", message: "Documents not submitted" },
    initialReview: { status: "not_started", message: "Waiting for document submission" },
    identityVerification: { status: "not_started", message: "Waiting for initial review" },
    addressVerification: { status: "not_started", message: "Waiting for identity verification" },
    finalApproval: { status: "not_started", message: "Waiting for address verification" },
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSecurityChange = (setting: string, value: boolean | string) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handlePaymentChange = (setting: string, value: string | boolean) => {
    setPaymentSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    // Simulate saving
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  // Add a function to generate a reference ID
  const generateReferenceId = () => {
    const timestamp = new Date().getTime().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `KYC-${timestamp}-${randomStr}`
  }

  // Add a function to handle the submission of KYC documents
  const handleKycSubmission = () => {
    // Generate a reference ID if one doesn't exist
    if (!referenceId) {
      setReferenceId(generateReferenceId())
    }

    // Update verification steps
    setVerificationSteps({
      documentSubmission: { status: "completed", message: "Documents submitted successfully" },
      initialReview: { status: "in_progress", message: "Your documents are being reviewed" },
      identityVerification: { status: "not_started", message: "Waiting for initial review" },
      addressVerification: { status: "not_started", message: "Waiting for identity verification" },
      finalApproval: { status: "not_started", message: "Waiting for final steps" },
    })

    setKycStatus("pending")
  }

  // Add a function to check verification status
  const checkVerificationStatus = () => {
    // In a real implementation, this would make an API call to check the status
    // For demo purposes, we'll simulate a status check
    if (searchReferenceId === referenceId) {
      // Show the current status
      return true
    } else if (searchReferenceId.startsWith("KYC-")) {
      // Simulate a random status for demo purposes
      const randomStatus = Math.floor(Math.random() * 4)
      const statuses = ["not_started", "pending", "verified", "rejected"]
      setKycStatus(statuses[randomStatus] as any)

      // Generate random verification steps
      const stepStatuses = ["not_started", "in_progress", "completed", "failed"]
      setVerificationSteps({
        documentSubmission: {
          status: stepStatuses[Math.min(randomStatus, 2)] as any,
          message: randomStatus >= 1 ? "Documents submitted successfully" : "Documents not submitted",
        },
        initialReview: {
          status: randomStatus >= 1 ? (stepStatuses[Math.min(randomStatus, 2)] as any) : "not_started",
          message: randomStatus >= 1 ? "Initial review in progress" : "Waiting for document submission",
        },
        identityVerification: {
          status: randomStatus >= 2 ? (stepStatuses[Math.min(randomStatus, 2)] as any) : "not_started",
          message: randomStatus >= 2 ? "Identity verified" : "Waiting for initial review",
        },
        addressVerification: {
          status: randomStatus >= 2 ? (stepStatuses[Math.min(randomStatus, 2)] as any) : "not_started",
          message: randomStatus >= 2 ? "Address verified" : "Waiting for identity verification",
        },
        finalApproval: {
          status: randomStatus >= 3 ? (stepStatuses[randomStatus === 3 ? 2 : 3] as any) : "not_started",
          message: randomStatus === 3 ? "Verification complete" : "Waiting for final steps",
        },
      })

      return true
    }

    return false
  }

  // Add a function to copy reference ID to clipboard
  const copyReferenceId = () => {
    navigator.clipboard.writeText(referenceId)
    // In a real implementation, you might want to show a toast notification
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-cyan-500" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-slate-800/50 p-1 mb-6">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="kyc" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
                <FileCheck className="h-4 w-4 mr-2" />
                KYC
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                      <AvatarFallback className="bg-slate-700 text-cyan-500 text-xl">JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="w-full border-slate-700 bg-slate-800/50 mb-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <div className="text-xs text-slate-400 text-center">
                      Recommended: Square JPG, PNG. <br />
                      Max size: 1MB
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <div className="text-sm font-medium text-slate-300 mb-3">Account Info</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-slate-500">Member ID</div>
                        <div className="text-sm text-slate-300">MLM12345</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Member Since</div>
                        <div className="text-sm text-slate-300">January 15, 2023</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Current Rank</div>
                        <div className="text-sm text-slate-300">Gold</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-sm font-medium text-slate-300 mb-4">Personal Information</div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs text-slate-400">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs text-slate-400">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs text-slate-400">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-xs text-slate-400">
                          Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={profileForm.address}
                          onChange={handleProfileChange}
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-xs text-slate-400">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500 min-h-[100px]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSave}>
                        {saveSuccess ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-0">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm font-medium text-slate-300 mb-4">Notification Preferences</div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <div>
                      <div className="font-medium text-sm text-slate-200">Email Notifications</div>
                      <div className="text-xs text-slate-400">Receive updates via email</div>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <div>
                      <div className="font-medium text-sm text-slate-200">SMS Notifications</div>
                      <div className="text-xs text-slate-400">Receive updates via text message</div>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <div>
                      <div className="font-medium text-sm text-slate-200">Team Updates</div>
                      <div className="text-xs text-slate-400">Notifications about your team's activity</div>
                    </div>
                    <Switch
                      checked={notificationSettings.teamUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("teamUpdates", checked)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <div>
                      <div className="font-medium text-sm text-slate-200">Commission Alerts</div>
                      <div className="text-xs text-slate-400">Get notified when you earn commissions</div>
                    </div>
                    <Switch
                      checked={notificationSettings.commissionAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("commissionAlerts", checked)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <div>
                      <div className="font-medium text-sm text-slate-200">Rank Changes</div>
                      <div className="text-xs text-slate-400">Get notified about rank advancements</div>
                    </div>
                    <Switch
                      checked={notificationSettings.rankChanges}
                      onCheckedChange={(checked) => handleNotificationChange("rankChanges", checked)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium text-sm text-slate-200">Promotional Updates</div>
                      <div className="text-xs text-slate-400">Receive marketing and promotional materials</div>
                    </div>
                    <Switch
                      checked={notificationSettings.promotions}
                      onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSave}>
                      {saveSuccess ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-0">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm font-medium text-slate-300 mb-4">Security Settings</div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="font-medium text-sm text-slate-200">Password</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-xs text-slate-400">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <div></div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-xs text-slate-400">
                          New Password
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-xs text-slate-400">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-cyan-400">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-700/50">
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                      <div>
                        <div className="font-medium text-sm text-slate-200">Two-Factor Authentication</div>
                        <div className="text-xs text-slate-400">Add an extra layer of security to your account</div>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                        className="data-[state=checked]:bg-cyan-500"
                      />
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                      <div>
                        <div className="font-medium text-sm text-slate-200">Login Alerts</div>
                        <div className="text-xs text-slate-400">Get notified about new login attempts</div>
                      </div>
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={(checked) => handleSecurityChange("loginAlerts", checked)}
                        className="data-[state=checked]:bg-cyan-500"
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-sm text-slate-200">Session Timeout</div>
                        <div className="text-xs text-slate-400">Automatically log out after inactivity</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                          className="w-16 h-8 bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                        />
                        <span className="text-xs text-slate-400">minutes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSave}>
                      {saveSuccess ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="mt-0">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm font-medium text-slate-300 mb-4">Payment Settings</div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="font-medium text-sm text-slate-200">Payment Method</div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="direct_deposit"
                          name="paymentMethod"
                          value="direct_deposit"
                          checked={paymentSettings.paymentMethod === "direct_deposit"}
                          onChange={() => handlePaymentChange("paymentMethod", "direct_deposit")}
                          className="text-cyan-500 focus:ring-cyan-500"
                        />
                        <Label htmlFor="direct_deposit" className="text-sm text-slate-300">
                          Direct Deposit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentSettings.paymentMethod === "paypal"}
                          onChange={() => handlePaymentChange("paymentMethod", "paypal")}
                          className="text-cyan-500 focus:ring-cyan-500"
                        />
                        <Label htmlFor="paypal" className="text-sm text-slate-300">
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="check"
                          name="paymentMethod"
                          value="check"
                          checked={paymentSettings.paymentMethod === "check"}
                          onChange={() => handlePaymentChange("paymentMethod", "check")}
                          className="text-cyan-500 focus:ring-cyan-500"
                        />
                        <Label htmlFor="check" className="text-sm text-slate-300">
                          Check
                        </Label>
                      </div>
                    </div>
                  </div>

                  {paymentSettings.paymentMethod === "direct_deposit" && (
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="font-medium text-sm text-slate-200 mb-3">Bank Information</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountName" className="text-xs text-slate-400">
                            Account Holder Name
                          </Label>
                          <Input
                            id="accountName"
                            value={paymentSettings.accountName}
                            onChange={(e) => handlePaymentChange("accountName", e.target.value)}
                            className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber" className="text-xs text-slate-400">
                            Account Number
                          </Label>
                          <Input
                            id="accountNumber"
                            value={paymentSettings.accountNumber}
                            onChange={(e) => handlePaymentChange("accountNumber", e.target.value)}
                            className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="routingNumber" className="text-xs text-slate-400">
                            Routing Number
                          </Label>
                          <Input
                            id="routingNumber"
                            value={paymentSettings.routingNumber}
                            onChange={(e) => handlePaymentChange("routingNumber", e.target.value)}
                            className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentSettings.paymentMethod === "paypal" && (
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="font-medium text-sm text-slate-200 mb-3">PayPal Information</div>
                      <div className="space-y-2">
                        <Label htmlFor="paypalEmail" className="text-xs text-slate-400">
                          PayPal Email
                        </Label>
                        <Input
                          id="paypalEmail"
                          type="email"
                          className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          placeholder="your-email@example.com"
                        />
                      </div>
                    </div>
                  )}

                  {paymentSettings.paymentMethod === "check" && (
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="font-medium text-sm text-slate-200 mb-3">Mailing Address</div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mailingAddress" className="text-xs text-slate-400">
                            Address
                          </Label>
                          <Textarea
                            id="mailingAddress"
                            className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500 min-h-[80px]"
                            placeholder="Enter your full mailing address"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="font-medium text-sm text-slate-200 mb-3">Payout Preferences</div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-slate-200">Automatic Withdrawals</div>
                          <div className="text-xs text-slate-400">Automatically withdraw funds when available</div>
                        </div>
                        <Switch
                          checked={paymentSettings.autoWithdraw}
                          onCheckedChange={(checked) => handlePaymentChange("autoWithdraw", checked)}
                          className="data-[state=checked]:bg-cyan-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-slate-200">Minimum Withdrawal Amount</div>
                          <div className="text-xs text-slate-400">Only withdraw when balance exceeds this amount</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-400">$</span>
                          <Input
                            value={paymentSettings.minWithdrawAmount}
                            onChange={(e) => handlePaymentChange("minWithdrawAmount", e.target.value)}
                            className="w-20 h-8 bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="font-medium text-sm text-slate-200 mb-3">Tax Information</div>
                    <div className="bg-slate-900/50 rounded-lg p-3 flex items-center text-xs text-slate-400">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                      Please complete your tax information in the Tax Documents section to ensure proper reporting.
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSave}>
                      {saveSuccess ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* KYC Tab */}
            <TabsContent value="kyc" className="mt-0">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-medium text-slate-300">KYC Verification</div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 bg-slate-800/50 text-slate-300"
                      onClick={() => setShowStatusCheck(!showStatusCheck)}
                    >
                      {showStatusCheck ? "Back to Verification" : "Check Status"}
                    </Button>
                  </div>
                </div>

                {showStatusCheck ? (
                  <div className="space-y-6">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-sm font-medium text-slate-300 mb-3">Verification Status Check</div>
                      <div className="flex space-x-2 mb-4">
                        <div className="flex-1">
                          <Input
                            placeholder="Enter your reference ID (e.g., KYC-123456-ABC)"
                            value={searchReferenceId}
                            onChange={(e) => setSearchReferenceId(e.target.value)}
                            className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                          />
                        </div>
                        <Button
                          className="bg-cyan-600 hover:bg-cyan-700"
                          onClick={() => {
                            const found = checkVerificationStatus()
                            if (!found) {
                              // Show error message
                              alert("Reference ID not found. Please check and try again.")
                            }
                          }}
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Check
                        </Button>
                      </div>

                      {searchReferenceId && searchReferenceId === referenceId && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-slate-300">Reference ID</div>
                            <div className="text-sm text-cyan-400">{searchReferenceId}</div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-slate-300">Status</div>
                            <Badge
                              className={`
                              ${
                                kycStatus === "verified"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : kycStatus === "rejected"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : kycStatus === "pending"
                                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              }
                            `}
                            >
                              {kycStatus === "verified"
                                ? "Verified"
                                : kycStatus === "rejected"
                                  ? "Rejected"
                                  : kycStatus === "pending"
                                    ? "Pending"
                                    : "Not Started"}
                            </Badge>
                          </div>

                          <div className="text-sm font-medium text-slate-300 mt-4 mb-2">Verification Progress</div>
                          <div className="space-y-3 bg-slate-900/30 p-3 rounded-md">
                            <VerificationStep
                              step="Document Submission"
                              status={verificationSteps.documentSubmission.status}
                              message={verificationSteps.documentSubmission.message}
                            />
                            <VerificationStep
                              step="Initial Review"
                              status={verificationSteps.initialReview.status}
                              message={verificationSteps.initialReview.message}
                            />
                            <VerificationStep
                              step="Identity Verification"
                              status={verificationSteps.identityVerification.status}
                              message={verificationSteps.identityVerification.message}
                            />
                            <VerificationStep
                              step="Address Verification"
                              status={verificationSteps.addressVerification.status}
                              message={verificationSteps.addressVerification.message}
                            />
                            <VerificationStep
                              step="Final Approval"
                              status={verificationSteps.finalApproval.status}
                              message={verificationSteps.finalApproval.message}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {kycStatus === "verified" ? (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-green-400">Verification Complete</div>
                          <div className="text-xs text-slate-400">Your identity has been verified successfully.</div>
                        </div>
                      </div>
                    ) : kycStatus === "rejected" ? (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-red-400">Verification Failed</div>
                          <div className="text-xs text-slate-400">
                            Your verification was rejected. Please resubmit with correct documents.
                          </div>
                        </div>
                      </div>
                    ) : kycStatus === "pending" ? (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-amber-400">Verification Pending</div>
                          <div className="text-xs text-slate-400">
                            Your documents are being reviewed. This usually takes 1-3 business days.
                          </div>
                        </div>
                        {referenceId && (
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-slate-400">Ref ID: {referenceId}</div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-slate-400 hover:text-cyan-400"
                              onClick={copyReferenceId}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center">
                        <FileCheck className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-blue-400">Verification Required</div>
                          <div className="text-xs text-slate-400">
                            Please complete the verification process to unlock all features.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="font-medium text-sm text-slate-200">Required Documents</div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          className={`bg-slate-800/70 rounded-lg p-4 border ${kycDocuments.idCard ? "border-green-500/30" : "border-slate-700/50"}`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                              <FileCheck
                                className={`h-6 w-6 ${kycDocuments.idCard ? "text-green-500" : "text-slate-500"}`}
                              />
                            </div>
                            <div className="text-sm font-medium text-slate-200 mb-1">ID Card / Passport</div>
                            <div className="text-xs text-slate-400 mb-4">
                              Upload a clear photo of your government-issued ID
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-slate-700 bg-slate-800/50"
                              onClick={() => setKycDocuments((prev) => ({ ...prev, idCard: true }))}
                              disabled={kycStatus === "pending" || kycStatus === "verified"}
                            >
                              {kycDocuments.idCard ? "Uploaded" : "Upload"}
                            </Button>
                          </div>
                        </div>

                        <div
                          className={`bg-slate-800/70 rounded-lg p-4 border ${kycDocuments.proofOfAddress ? "border-green-500/30" : "border-slate-700/50"}`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                              <FileCheck
                                className={`h-6 w-6 ${kycDocuments.proofOfAddress ? "text-green-500" : "text-slate-500"}`}
                              />
                            </div>
                            <div className="text-sm font-medium text-slate-200 mb-1">Proof of Address</div>
                            <div className="text-xs text-slate-400 mb-4">
                              Recent utility bill or bank statement (last 3 months)
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-slate-700 bg-slate-800/50"
                              onClick={() => setKycDocuments((prev) => ({ ...prev, proofOfAddress: true }))}
                              disabled={kycStatus === "pending" || kycStatus === "verified"}
                            >
                              {kycDocuments.proofOfAddress ? "Uploaded" : "Upload"}
                            </Button>
                          </div>
                        </div>

                        <div
                          className={`bg-slate-800/70 rounded-lg p-4 border ${kycDocuments.selfie ? "border-green-500/30" : "border-slate-700/50"}`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                              <Video
                                className={`h-6 w-6 ${kycDocuments.selfie ? "text-green-500" : "text-slate-500"}`}
                              />
                            </div>
                            <div className="text-sm font-medium text-slate-200 mb-1">Video Selfie</div>
                            <div className="text-xs text-slate-400 mb-4">Record a 10-15 second video of yourself</div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-slate-700 bg-slate-800/50"
                              onClick={() => setKycDocuments((prev) => ({ ...prev, selfie: true }))}
                              disabled={kycStatus === "pending" || kycStatus === "verified"}
                            >
                              {kycDocuments.selfie ? "Recorded" : "Record"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="font-medium text-sm text-slate-200 mb-3">Verification Process</div>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3">
                            <span className="text-xs text-cyan-500">1</span>
                          </div>
                          <div>
                            <div className="text-sm text-slate-300">Upload Required Documents</div>
                            <div className="text-xs text-slate-400">
                              Provide clear, unaltered images of all required documents
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3">
                            <span className="text-xs text-cyan-500">2</span>
                          </div>
                          <div>
                            <div className="text-sm text-slate-300">Record Video Selfie</div>
                            <div className="text-xs text-slate-400">Record a short video to confirm your identity</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3">
                            <span className="text-xs text-cyan-500">3</span>
                          </div>
                          <div>
                            <div className="text-sm text-slate-300">Review Process</div>
                            <div className="text-xs text-slate-400">
                              Our team will verify your documents within 1-3 business days
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3">
                            <span className="text-xs text-cyan-500">4</span>
                          </div>
                          <div>
                            <div className="text-sm text-slate-300">Verification Complete</div>
                            <div className="text-xs text-slate-400">
                              Once verified, you'll gain full access to all platform features
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button
                        className="bg-cyan-600 hover:bg-cyan-700"
                        disabled={
                          !kycDocuments.idCard ||
                          !kycDocuments.proofOfAddress ||
                          !kycDocuments.selfie ||
                          kycStatus === "pending" ||
                          kycStatus === "verified"
                        }
                        onClick={handleKycSubmission}
                      >
                        {kycStatus === "not_started"
                          ? "Submit for Verification"
                          : kycStatus === "pending"
                            ? "Verification in Progress"
                            : kycStatus === "rejected"
                              ? "Resubmit for Verification"
                              : "Verified"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

