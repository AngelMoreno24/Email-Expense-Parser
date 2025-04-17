import { google } from 'googleapis';

// Helper function to extract the amount from text
function extractAmount(text) {
  const match = text.match(/(?:Rs\.?|₹|\$)?\s?(\d{2,7}(?:\.\d{1,2})?)/i);
  return match ? match[1] : null;
}

// Helper function for expense-related emails
function isExpenseEmail(text) {
  const expenseKeywords = [
    "transaction", "payment", "debited", "purchase", "receipt", 
    "order", "amount paid", "charged", "invoice", "expense", "billing"
  ];

  const promotionalKeywords = [
    "get more than you expect", "sale", "offer", "limited time", 
    "buy now", "discount", "free", "deal", "limited offer", 
    "gift", "voucher", "coupon", "order today", "hurry", "exclusive", "sent you"
  ];

  // Check for promotional phrases
  const isPromotional = promotionalKeywords.some(word => text.toLowerCase().includes(word));

  if (isPromotional) {
    return false; // Skip this email if it's promotional
  }

  // Check for expense-related keywords
  return expenseKeywords.some(word => text.toLowerCase().includes(word));
}

// Helper function to categorize the expense based on keywords
function categorizeExpense(text) {
  const categories = {
    food: ['zomato', 'swiggy', 'restaurant', 'meal', 'takeout', 'delivery', 'snacks', 'beverages', 'coffee', 'fast food', 'grocery', 'cafe'],
    transportation: ['uber', 'ola', 'taxi', 'ride', 'public transport', 'metro', 'bus', 'train', 'flight', 'airline', 'car rental', 'vehicle', 'toll', 'fuel', 'gas', 'parking'],
    shopping: ['amazon', 'flipkart', 'ebay', 'shop', 'shopping', 'purchase', 'order', 'cart', 'wishlist', 'delivery', 'product', 'item', 'return', 'sale', 'discount', 'coupon', 'transaction'],
    bills: ['electricity', 'gas', 'water', 'broadband', 'mobile', 'recharge', 'subscription', 'bill', 'payment', 'service', 'invoice', 'tax', 'insurance', 'membership'],
    travel: ['hotel', 'airbnb', 'booking', 'travel', 'trip', 'tour', 'vacation', 'accommodation', 'resort', 'hostel', 'flight ticket', 'hotel reservation', 'car hire'],
    healthcare: ['hospital', 'clinic', 'medical', 'pharmacy', 'medicine', 'doctor', 'appointment', 'insurance', 'health', 'healthcare', 'treatment', 'prescription'],
    entertainment: ['movie', 'theater', 'concert', 'event', 'show', 'ticket', 'sports', 'recreation', 'theme park', 'vacation', 'game', 'music', 'netflix', 'streaming', 'subscription'],
    education: ['course', 'degree', 'workshop', 'seminar', 'tutoring', 'study', 'tuition', 'school', 'college', 'university', 'education', 'book purchase', 'textbooks', 'e-learning'],
    gifts: ['gift', 'donation', 'charity', 'fundraiser', 'philanthropy', 'support', 'contribution', 'gift card', 'giving', 'purchase gift', 'gift voucher', 'fundraising'],
    misc: ['miscellaneous', 'other', 'general', 'unknown', 'unspecified', 'personal', 'unclassified']
  };

  const lowerText = text.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(word => lowerText.includes(word))) {
      return category;
    }
  }
  return 'misc';  // Default to 'misc' if no category is matched
}

export const getExpenses = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { accessToken } = req.user;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth });
  const result = await gmail.users.messages.list({
    userId: 'me',
    q: 'receipt OR transaction OR payment',
    maxResults: 50
  });

  const summaries = [];
  for (let m of result.data.messages) {
    const msg = await gmail.users.messages.get({ userId: 'me', id: m.id });
    const snippet = msg.data.snippet;

    // Step 1: Check if the email is related to expenses and not promotional
    if (isExpenseEmail(snippet)) {
      const amount = extractAmount(snippet);
      const category = categorizeExpense(snippet);

      if (amount) {
        summaries.push({ snippet, amount, category });
      }
    }
  }

  res.json(summaries);
};