"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqSections = [
  {
    title: "Account & Security",
    items: [
      {
        question: "How do I change my password?",
        answer: "You can change your password in the Settings page under the Security tab. You'll need to enter your current password and choose a new one."
      },
      {
        question: "What should I do if I suspect unauthorized access?",
        answer: "Immediately contact our emergency support line at 1-800-Saduru and change your password. We recommend enabling two-factor authentication for additional security."
      }
    ]
  },
  {
    title: "Deposits & Withdrawals",
    items: [
      {
        question: "What's the minimum deposit amount?",
        answer: "The minimum deposit amount is $100. We accept bank transfers (ACH) and credit/debit cards as payment methods."
      },
      {
        question: "How long do deposits take to process?",
        answer: "Bank transfers typically take 1-2 business days to process. Credit/debit card deposits are usually available immediately."
      },
      {
        question: "Are there any fees for deposits?",
        answer: "No, we don't charge any fees for deposits. However, your bank or card issuer might have their own fees."
      }
    ]
  },
  {
    title: "Account Management",
    items: [
      {
        question: "How do I update my contact information?",
        answer: "You can update your contact information in the Settings page under the Profile tab. This includes your email address and full name."
      },
      {
        question: "Can I have multiple accounts?",
        answer: "No, we currently allow only one account per user to ensure compliance with our security policies."
      }
    ]
  }
];

export function HelpSection() {
  return (
    <div className="space-y-6">
      {faqSections.map((section, index) => (
        <Card key={index} className="p-6">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      ))}

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-gray-600">
          If you couldn't find the answer you're looking for, please don't hesitate to contact our support team. We're here to help!
        </p>
      </Card>
    </div>
  );
} 