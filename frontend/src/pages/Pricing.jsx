import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Sparkles, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleSelectPlan = (planName) => {
    showToast(`Subscribed to ${planName} plan successfully!`, 'success');
  };

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Forever free',
      description: 'Essential tools for any job seeker starting their search.',
      popular: false,
      features: [
        'Apply to up to 15 jobs per month',
        'Standard profile visibility',
        'Basic job alerts & notifications',
        'Direct application tracking',
        'Community forum support',
      ],
      cta: 'Current Plan',
      variant: 'secondary',
    },
    {
      name: 'Pro Candidate',
      price: billingCycle === 'monthly' ? '$19' : '$15',
      period: 'per month, billed ' + (billingCycle === 'monthly' ? 'monthly' : 'annually'),
      description: 'Accelerate your career search with 3x recruiter profile visibility.',
      popular: true,
      features: [
        'Unlimited job applications',
        'Top of applicant queue priority badge',
        'Real-time recruiter view notifications',
        'Salary benchmark insights for every role',
        'Direct messaging with verified recruiters',
        'Resume review & AI keyword optimization',
      ],
      cta: 'Upgrade to Pro',
      variant: 'primary',
    },
    {
      name: 'Enterprise / Employer',
      price: billingCycle === 'monthly' ? '$149' : '$119',
      period: 'per month, billed ' + (billingCycle === 'monthly' ? 'monthly' : 'annually'),
      description: 'For growing teams and recruiters hiring top engineering & design talent.',
      popular: false,
      features: [
        'Post unlimited active job listings',
        'Access to 2M+ verified candidate database',
        'AI candidate matching & shortlist scoring',
        'Custom company branding & showcase page',
        'ATS integration (Greenhouse, Lever, Workday)',
        'Dedicated account manager & 24/7 SLA',
      ],
      cta: 'Start 14-Day Free Trial',
      variant: 'primary',
    },
  ];

  const faqs = [
    {
      q: 'Can I cancel or switch my plan anytime?',
      a: 'Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with no cancellation fees.',
    },
    {
      q: 'How does the Priority Applicant badge work?',
      a: 'When you apply to jobs with Pro Candidate, your application is highlighted with a gold verified badge and pinned near the top of the recruiter’s candidate dashboard.',
    },
    {
      q: 'Do you offer student or non-profit discounts?',
      a: 'Yes! Students with a valid .edu email address receive a 50% lifetime discount on the Pro Candidate plan.',
    },
    {
      q: 'Is there a free trial for employer accounts?',
      a: 'Yes, employers get a full 14-day free trial with unlimited job postings and candidate searches without any upfront commitment.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent, Value-Driven Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Invest in Your Next Dream Role
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400">
          Whether you are an ambitious job seeker or an enterprise hiring team, HireHub gives you the unfair advantage.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span
            className={`text-xs font-bold ${
              billingCycle === 'monthly'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-400'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
            }
            className="w-12 h-6 bg-indigo-100 dark:bg-indigo-900/60 rounded-full p-1 transition-colors cursor-pointer relative"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#6D4AFF] transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`text-xs font-bold flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-400'
            }`}
          >
            <span>Annual</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl p-8 transition-all flex flex-col justify-between glowing-card relative ${
              plan.popular
                ? 'bg-white dark:bg-slate-900 border-2 border-[#6D4AFF] shadow-xl shadow-indigo-500/10 scale-105 z-10'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#6D4AFF] to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                Most Popular
              </div>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-[#6D4AFF] dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => handleSelectPlan(plan.name)}
              variant={plan.variant}
              size="md"
              className={`w-full justify-center ${
                plan.popular ? 'glowing-btn shadow-lg shadow-indigo-500/20' : ''
              }`}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Enterprise CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-4 h-4" />
            <span>Enterprise Custom Solution</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">Need tailored recruitment pipelines?</h3>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            Custom ATS integrations, dedicated hiring analytics, volume candidate sourcing, and white-glove onboarding for enterprise organizations.
          </p>
        </div>
        <Button
          onClick={() => navigate('/employer/dashboard')}
          variant="secondary"
          size="lg"
          className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg shrink-0 font-extrabold"
        >
          Talk to Talent Specialists
        </Button>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#6D4AFF] shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
