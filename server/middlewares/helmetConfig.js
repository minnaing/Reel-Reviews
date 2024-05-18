export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://www.gstatic.com", 
        "https://apis.google.com",
        "https://www.google.com",
        "https://maps.googleapis.com"
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://fonts.googleapis.com",
        "https://www.gstatic.com"
      ],
      fontSrc: [
        "'self'", 
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "https://www.gstatic.com",
        "https://api.themoviedb.org", 
        "https://image.tmdb.org",
        "https://maps.googleapis.com",
        "https://maps.gstatic.com",
        "https://lh3.googleusercontent.com",
        "https://placehold.co/600x400?text=No Image Available",
        // "https://placehold.co"

      ],
      connectSrc: [
        "'self'", 
        "https://api.themoviedb.org",
        "https://*.googleapis.com"
      ],
      frameSrc: [
        "'self'", 
        "https://www.google.com",
        "https://*.youtube.com"
      ],
      objectSrc: ["'none'"],
      baseUri: ["'self'"]
    }
  },
  contentSecurityPolicyReportOnly: false
};
