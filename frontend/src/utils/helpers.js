export const formatCurrency = (amount, currency = '$') => {
  if (!amount) return `${currency}0`;
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(0)}k`;
  }
  return `${currency}${amount}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Recent';
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'applied':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'under review':
      return 'bg-purple-50 text-purple-600 border-purple-200';
    case 'shortlisted':
      return 'bg-indigo-50 text-indigo-600 border-indigo-200';
    case 'interview':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'offer':
    case 'accepted':
    case 'hired':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'rejected':
      return 'bg-rose-50 text-rose-600 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200';
  }
};
