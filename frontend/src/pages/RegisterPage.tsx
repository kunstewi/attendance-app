import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GraduationCap, School } from "lucide-react";

export default function RegisterPage() {
    const [role, setRole] = useState("student");

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to register
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="college">College</Label>
                            <Input id="college" placeholder="College Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input id="department" placeholder="Department" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>I am a...</Label>
                        <RadioGroup defaultValue="student" onValueChange={setRole} className="grid grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="student" id="student" className="peer sr-only" />
                                <Label
                                    htmlFor="student"
                                    className={cn(
                                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                                        role === "student" && "border-primary"
                                    )}
                                >
                                    <GraduationCap className="mb-3 h-6 w-6" />
                                    Student
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                                <Label
                                    htmlFor="teacher"
                                    className={cn(
                                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                                        role === "teacher" && "border-primary"
                                    )}
                                >
                                    <School className="mb-3 h-6 w-6" />
                                    Teacher
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full">Register</Button>
                    <div className="text-sm text-center text-neutral-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline">
                            Login
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
