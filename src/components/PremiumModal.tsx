
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal = ({ isOpen, onClose }: PremiumModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-6 w-6 p-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="bg-blue-50 p-4 pt-8">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold">
              Choose your payment frequency
            </DialogTitle>
            <DialogDescription className="text-base">
              Instant Access, Cancel Anytime
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Left side - Plan description */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold">Careerfocus Premium</h3>
                <span className="text-blue-500 text-lg">✨</span>
              </div>
              
              <p className="text-sm mb-2">Premium members are</p>
              <p className="text-blue-600 font-medium mb-4">10X more effective in their Job Search</p>
              
              <div className="mb-4">
                <h4 className="text-gray-600 mb-2 text-sm">Everything in the free version, plus:</h4>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">›</span>
                    <span>Unlimited AI Resumes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">›</span>
                    <span>Unlimited AI Resume ATS Optimizer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">›</span>
                    <span>Unlimited AI Resume Bullet and Summary Writer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">›</span>
                    <span>Advanced AI Resume Analysis</span>
                  </li>
                </ul>
              </div>
              
              <Button variant="link" className="text-blue-600 p-0 text-sm">
                View more
              </Button>
            </div>
            
            {/* Right side - Payment options */}
            <div className="bg-white rounded-lg p-4">
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="text-green-500 h-4 w-4" />
                  <span className="text-xs">Instant access, Cancel anytime.</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center justify-between border rounded-md p-2 cursor-pointer bg-blue-50 border-blue-200">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="payment-plan" 
                      className="h-4 w-4 text-blue-600 mr-2"
                      defaultChecked 
                    />
                    <div>
                      <p className="font-medium text-sm">₹299 per week</p>
                      <p className="text-xs text-gray-500">paid weekly</p>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between border rounded-md p-2 cursor-pointer">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="payment-plan" 
                      className="h-4 w-4 text-blue-600 mr-2" 
                    />
                    <div>
                      <p className="font-medium text-sm">₹999 per month</p>
                      <p className="text-xs text-gray-500">paid monthly</p>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between border rounded-md p-2 cursor-pointer">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="payment-plan" 
                      className="h-4 w-4 text-blue-600 mr-2" 
                    />
                    <div>
                      <p className="font-medium text-sm">₹700 per month</p>
                      <p className="text-xs text-gray-500">paid quarterly</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100 text-xs">
                    Most Popular - Save 30%
                  </Badge>
                </label>
                
                <label className="flex items-center justify-between border rounded-md p-2 cursor-pointer">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="payment-plan" 
                      className="h-4 w-4 text-blue-600 mr-2" 
                    />
                    <div>
                      <p className="font-medium text-sm">₹400 per month</p>
                      <p className="text-xs text-gray-500">paid yearly</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 text-xs">
                    Best Value - Save 60%
                  </Badge>
                </label>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4 font-medium py-2 text-sm">
                Unlock Premium Features
              </Button>
              
              <div className="text-center mt-3">
                <Button variant="link" className="text-blue-600 text-xs">
                  Redeem Voucher
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment by Stripe.com. All payments are fully encrypted and PCI-compliant. 
                We accept multiple payment methods.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
