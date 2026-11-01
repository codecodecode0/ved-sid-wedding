import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { photos, wedding } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heart, Loader2 } from "lucide-react";
import { saveRsvp } from "@/lib/supabase";
import AddToCalendar from "./AddToCalendar";

const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+64", label: "🇳🇿 +64" },
];

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address").or(z.literal("")),
  phoneCode: z.string(),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[0-9][0-9 -]{4,18}[0-9]$/.test(v), "Please enter a valid phone number"),
  attendance: z.enum(["attending", "not-attending"], {
    required_error: "Please select your attendance",
  }),
  guests: z.string().optional(),
  dietary: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const RSVPForm = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAttending, setSubmittedAttending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneCode: "+91",
      phone: "",
      guests: "",
      dietary: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const attending = data.attendance === "attending";
    try {
      const digits = data.phone.replace(/[^0-9]/g, "");
      await saveRsvp({
        name: data.name.trim(),
        email: data.email || null,
        phone: digits ? `${data.phoneCode} ${digits}` : null,
        attendance: data.attendance,
        guests: attending && data.guests ? Math.min(10, Math.max(1, Number(data.guests))) : null,
        dietary: attending && data.dietary?.trim() ? data.dietary.trim() : null,
        message: data.message?.trim() || null,
      });
    } catch (error) {
      console.error("RSVP could not be saved", error);
      setSubmitError("Sorry, we couldn't save your response. Please check your connection and try again.");
      return;
    }
    setSubmittedAttending(attending);
    setIsSubmitted(true);
  };

  const attendance = form.watch("attendance");

  if (isSubmitted) {
    return (
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <Heart className="w-12 h-12 mx-auto mb-6 text-haldi" />
            </motion.div>
            <p lang="mr" className="text-2xl text-rose-foreground mb-2">धन्यवाद!</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Thank You
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {submittedAttending
                ? "Your response has been received. We are so grateful you'll be part of our special day. We can't wait to celebrate with you."
                : "Your response has been received. We'll miss you, and we're grateful for your love and blessings."}
            </p>
            {submittedAttending && (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-3">Save the dates so you don't miss a moment:</p>
                <AddToCalendar />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            We Hope You Can Join Us
          </p>
          <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">
            Kindly Respond
          </h2>
          <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">आपली उपस्थिती प्रार्थनीय.</p>
          <LotusDivider className="mt-7" />
          <p className="text-muted-foreground mt-7 max-w-md mx-auto">
            {wedding.dates} · {wedding.venue}
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-center">
          {/* Decorative Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[19rem] sm:max-w-sm lg:max-w-none mx-auto mb-10 lg:mb-0"
          >
            <div className="relative">
              <img
                src={photos.rsvp.src}
                alt={photos.rsvp.alt}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover object-top arch-frame"
              />
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-zari/70 m-5 arch-frame pointer-events-none" />
            </div>
            {/* Floating quote */}
            <motion.div 
              className="absolute -bottom-8 -right-3 sm:-right-8 bg-background p-4 sm:p-6 shadow-xl max-w-[210px] sm:max-w-[250px] border-t-4 border-haldi"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p lang="mr" className="text-lg text-rose-foreground">आग्रहाचे निमंत्रण</p>
              <p className="font-serif text-lg italic text-muted-foreground mt-1">
                "Can't wait to celebrate with you!"
              </p>
              <p className="text-sm tracking-wider uppercase mt-2 text-rose-foreground">— V & S</p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm tracking-wide uppercase">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name as it appears on the invitation"
                          className="bg-background border-border/50 focus:border-rose/50 transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm tracking-wide uppercase">
                        Email Address (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-background border-border/50 focus:border-rose/50 transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone with country code */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm tracking-wide uppercase">Phone Number (Optional)</FormLabel>
                      <div className="flex gap-2">
                        <select
                          aria-label="Country code"
                          {...form.register("phoneCode")}
                          className="h-10 rounded-md border border-border/50 bg-background px-2 text-sm focus:border-rose/50 focus:outline-none"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel-national"
                            placeholder="98765 43210"
                            className="bg-background border-border/50 focus:border-rose/50 transition-colors"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Attendance */}
                <FormField
                  control={form.control}
                  name="attendance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm tracking-wide uppercase">
                        Will You Attend?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-6 pt-2"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem
                              value="attending"
                              id="attending"
                              className="border-border"
                            />
                            <Label
                              htmlFor="attending"
                              className="font-serif text-lg cursor-pointer"
                            >
                              Joyfully Accept
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem
                              value="not-attending"
                              id="not-attending"
                              className="border-border"
                            />
                            <Label
                              htmlFor="not-attending"
                              className="font-serif text-lg cursor-pointer"
                            >
                              Regretfully Decline
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conditional fields for attending guests */}
                {attendance === "attending" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-8"
                  >
                    {/* Number of Guests */}
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm tracking-wide uppercase">
                            Number of Guests (Including Yourself)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              placeholder="1"
                              className="bg-background border-border/50 focus:border-rose/50 transition-colors w-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Dietary Restrictions */}
                    <FormField
                      control={form.control}
                      name="dietary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm tracking-wide uppercase">
                            Dietary Restrictions
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Vegetarian, vegan, allergies, etc."
                              className="bg-background border-border/50 focus:border-rose/50 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm tracking-wide uppercase">
                        A Note for the Couple (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your wishes or a message..."
                          className="bg-background border-border/50 focus:border-rose/50 transition-colors min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 py-6 text-sm tracking-[0.2em] uppercase"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send Response"
                    )}
                  </Button>
                </motion.div>
                {submitError && (
                  <p role="alert" className="text-sm text-destructive text-center -mt-4">
                    {submitError}
                  </p>
                )}
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
