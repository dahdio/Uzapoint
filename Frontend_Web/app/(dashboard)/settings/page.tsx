"use client"

import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <>
      <AppHeader title="Settings" description="Manage your business configuration" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="business" className="text-xs">
              Business
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-xs">
              Payment
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" className="text-xs">
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-sm">Business Information</CardTitle>
                <CardDescription className="text-xs">
                  Update your business details and branding.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="business-name" className="text-xs">
                      Business Name
                    </Label>
                    <Input
                      id="business-name"
                      defaultValue="Uzapoint Demo Store"
                      className="h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="business-phone" className="text-xs">
                      Phone Number
                    </Label>
                    <Input
                      id="business-phone"
                      defaultValue="+254 712 345 678"
                      className="h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="business-email" className="text-xs">
                    Email Address
                  </Label>
                  <Input
                    id="business-email"
                    defaultValue="admin@uzapoint.co.ke"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="business-address" className="text-xs">
                    Business Address
                  </Label>
                  <Input
                    id="business-address"
                    defaultValue="Kimathi Street, Nairobi, Kenya"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tax-pin" className="text-xs">
                    KRA PIN
                  </Label>
                  <Input
                    id="tax-pin"
                    defaultValue="P051234567A"
                    className="h-9"
                  />
                </div>
                <Button className="w-fit" size="sm">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle className="text-sm">Receipt Settings</CardTitle>
                <CardDescription className="text-xs">
                  Customize how receipts are generated.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Auto-print receipts</p>
                    <p className="text-[10px] text-muted-foreground">
                      Automatically print receipt after each sale
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Include VAT breakdown</p>
                    <p className="text-[10px] text-muted-foreground">
                      Show VAT details on receipts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Digital receipts (SMS)</p>
                    <p className="text-[10px] text-muted-foreground">
                      Send digital receipts via SMS
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-sm">M-Pesa Integration</CardTitle>
                <CardDescription className="text-xs">
                  Configure your M-Pesa payment settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Enable M-Pesa payments</p>
                    <p className="text-[10px] text-muted-foreground">
                      Accept M-Pesa payments at POS
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="paybill" className="text-xs">
                      Paybill / Till Number
                    </Label>
                    <Input
                      id="paybill"
                      defaultValue="123456"
                      className="h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="mpesa-name" className="text-xs">
                      Business Name (Mpesa)
                    </Label>
                    <Input
                      id="mpesa-name"
                      defaultValue="UZAPOINT STORE"
                      className="h-9"
                    />
                  </div>
                </div>
                <Button className="w-fit" size="sm">
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle className="text-sm">Tax Configuration</CardTitle>
                <CardDescription className="text-xs">
                  Set your tax rates for transactions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="vat-rate" className="text-xs">
                      VAT Rate (%)
                    </Label>
                    <Input
                      id="vat-rate"
                      type="number"
                      defaultValue="16"
                      className="h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="currency" className="text-xs">
                      Currency
                    </Label>
                    <Input
                      id="currency"
                      defaultValue="KES"
                      className="h-9"
                      readOnly
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-sm">Notification Preferences</CardTitle>
                <CardDescription className="text-xs">
                  Choose what notifications you receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Low stock alerts</p>
                    <p className="text-[10px] text-muted-foreground">
                      Get notified when products are running low
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Daily sales summary</p>
                    <p className="text-[10px] text-muted-foreground">
                      Receive daily email summary of sales
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Payment confirmations</p>
                    <p className="text-[10px] text-muted-foreground">
                      Get notified on payment success/failure
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">New agent registration</p>
                    <p className="text-[10px] text-muted-foreground">
                      Notifications when agents sign up
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-sm">Account Details</CardTitle>
                <CardDescription className="text-xs">
                  Manage your personal account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="full-name" className="text-xs">
                      Full Name
                    </Label>
                    <Input
                      id="full-name"
                      defaultValue="John Doe"
                      className="h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="role" className="text-xs">
                      Role
                    </Label>
                    <Input
                      id="role"
                      defaultValue="Admin"
                      className="h-9"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="account-email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="account-email"
                    defaultValue="john@uzapoint.co.ke"
                    className="h-9"
                  />
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-medium">Change Password</p>
                  <p className="text-[10px] text-muted-foreground mb-3">
                    Update your account password.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="current-password" className="text-xs">
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="h-9"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="new-password" className="text-xs">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="h-9"
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-fit" size="sm">
                  Update Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
