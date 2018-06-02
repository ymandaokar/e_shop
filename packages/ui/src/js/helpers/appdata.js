exports.FeaturedData = {
  // REQUIRED
  version: "https://jsonfeed.org/version/1", //fixed, per the spec
  id: "", // feed id
  title: "This is a Featured Category", //feed title
  description: "Featured", //feed description
  category: "Featured", //feed category
  link: "", //api url

  // OPTIONAL
  ttl: "", //max time in minutes to cache the feed items

  // category Settings
  categorySettings: {
    Featured: {
      sectionTitle: "Deals of the Day",
      buttonLabel: "View All",
      expireTime: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5,
      backgroundImageMob: "./extern/products/mobileGridBackground.jpg"
    },
    Imagery: {
      textColor: "#31608f",
      patternUrl:
        "http://www.vinsonandmccordrealtyllc.com/clipart/backgrounds/fullpage/flowers_yellow_cream.jpg"
    },
    Trending: {
      sectionTitle: "Best sellers",
      buttonLabel: "View All",
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5,
      backgroundImageMob: "./extern/products/mobileGridBackground1.jpg"
    }
  },
  items: [
    {
      id: "", // itemid
      title: "Children's Motrin",
      description: "Dye-Free Berry Flavor",
      category: "Baby and children",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/ChildrenMotrin-500x500.jpeg",
        s: "./extern/products/ChildrenMotrin-500x500.jpeg",
        m: "./extern/products/ChildrenMotrin-500x500.jpeg",
        l: "./extern/products/ChildrenMotrin-500x500.jpeg",
        xl: "./extern/products/ChildrenMotrin-500x500.jpeg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Chocolate chip",
      description: "Clif Bar Chocolate Chip",
      category: "Bars",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/clif-r3_chchp-500x500.png",
        s: "./extern/products/clif-r3_chchp-500x500.png",
        m: "./extern/products/clif-r3_chchp-500x500.png",
        l: "./extern/products/clif-r3_chchp-500x500.png",
        xl: "./extern/products/clif-r3_chchp-500x500.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Blueberry Fig",
      description: "Fig Bar Blueberry",
      category: "Bars",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/Whole Wheat Blueberry Fig Bar-500x500.png",
        s: "./extern/products/Whole Wheat Blueberry Fig Bar-500x500.png",
        m: "./extern/products/Whole Wheat Blueberry Fig Bar-500x500.png",
        l: "./extern/products/Whole Wheat Blueberry Fig Bar-500x500.png",
        xl: "./extern/products/Whole Wheat Blueberry Fig Bar-500x500.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "TruMoo Chocolate Milk",
      description: "Freshness Guaranteed",
      category: "Best sellers",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/TruMoo_HG_Choc_WH_2017-261x640-500x500.png",
        s: "./extern/products/TruMoo_HG_Choc_WH_2017-261x640-500x500.png",
        m: "./extern/products/TruMoo_HG_Choc_WH_2017-261x640-500x500.png",
        l: "./extern/products/TruMoo_HG_Choc_WH_2017-261x640-500x500.png",
        xl: "./extern/products/TruMoo_HG_Choc_WH_2017-261x640-500x500.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Sour Punch Watermelon",
      description: "A new flavor Fam!",
      category: "Candy",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/Watermelon-500x500.jpg",
        s: "./extern/products/Watermelon-500x500.jpg",
        m: "./extern/products/Watermelon-500x500.jpg",
        l: "./extern/products/Watermelon-500x500.jpg",
        xl: "./extern/products/Watermelon-500x500.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Ring Pops",
      description: "Assorted Variety",
      category: "Candy",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/ring-pop-case_1024x1024-500x500.png",
        s: "./extern/products/ring-pop-case_1024x1024-500x500.png",
        m: "./extern/products/ring-pop-case_1024x1024-500x500.png",
        l: "./extern/products/ring-pop-case_1024x1024-500x500.png",
        xl: "./extern/products/ring-pop-case_1024x1024-500x500.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    }
  ]
};
exports.TrendingData = {
  // REQUIRED
  version: "https://jsonfeed.org/version/1", //fixed, per the spec
  id: "", // feed id
  title: "This is a Trending Category", //feed title
  description: "Trending", //feed description
  category: "Trending", //feed category
  link: "", //api url

  // OPTIONAL
  ttl: "", //max time in minutes to cache the feed items

  // category Settings
  categorySettings: {
    Featured: {
      sectionTitle: "Deals of the Day",
      buttonLabel: "View All",
      expireTime: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5,
      backgroundImageMob: "./extern/products/mobileGridBackground.jpg"
    },
    Imagery: {
      textColor: "#31608f",
      patternUrl:
        "http://www.vinsonandmccordrealtyllc.com/clipart/backgrounds/fullpage/flowers_yellow_cream.jpg"
    },
    Trending: {
      sectionTitle: "Best sellers",
      buttonLabel: "View All",
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5,
      backgroundImageMob: "./extern/products/mobileGridBackground1.jpg"
    }
  },
  items: [
    {
      id: "", // itemid
      title: "Barber's 2% Milk",
      description: "Freshness Guaranteed",
      category: "Dairy",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/Barbers-500x500.jpg",
        s: "./extern/products/Barbers-500x500.jpg",
        m: "./extern/products/Barbers-500x500.jpg",
        l: "./extern/products/Barbers-500x500.jpg",
        xl: "./extern/products/Barbers-500x500.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Hottips Stereo Earbuds",
      description: "Hottips Stereo Earbuds",
      category: "Electronics",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/Earbuds-500x500.jpg",
        s: "./extern/products/Earbuds-500x500.jpg",
        m: "./extern/products/Earbuds-500x500.jpg",
        l: "./extern/products/Earbuds-500x500.jpg",
        xl: "./extern/products/Earbuds-500x500.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Dish Detergent Pacs",
      description: "Cascade Action Pacs",
      category: "Kitchen Essentials",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/cascade_12pk-500x500.jpg",
        s: "./extern/products/cascade_12pk-500x500.jpg",
        m: "./extern/products/cascade_12pk-500x500.jpg",
        l: "./extern/products/cascade_12pk-500x500.jpg",
        xl: "./extern/products/cascade_12pk-500x500.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Dude Wipes",
      description: "100% Biodegradable",
      category: "Health and beauty",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/DudeWipes-500x500.jpg",
        s: "./extern/products/DudeWipes-500x500.jpg",
        m: "./extern/products/DudeWipes-500x500.jpg",
        l: "./extern/products/DudeWipes-500x500.jpg",
        xl: "./extern/products/DudeWipes-500x500.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Bottle Bong",
      description: "Bottle Bong Quick and Concealable",
      category: "Gameday",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/Bronco Keg Pump-500x500.jpg",
        s: "./extern/products/Bronco Keg Pump-500x500.jpg",
        m: "./extern/products/Bronco Keg Pump-500x500.jpg",
        l: "./extern/products/Bronco Keg Pump-500x500.jpg",
        xl: "./extern/products/Bronco Keg Pump-500x500.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Rucksack",
      description: "Military Design Rucksack",
      category: "Bagpack",
      image: {
        // urls of the image in various sizes
        xs: "./extern/products/Bagpack.jpg",
        s: "./extern/products/Bagpack.jpg",
        m: "./extern/products/Bagpack.jpg",
        l: "./extern/products/Bagpack.jpg",
        xl: "./extern/products/Bagpack.jpg"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    }
  ]
};
exports.ImageryData = {
  // REQUIRED
  version: "https://jsonfeed.org/version/1", //fixed, per the spec
  id: "", // feed id
  title: "This is a Imagery Category", //feed title
  description: "Imagery", //feed description
  category: "Imagery", //feed category
  link: "", //api url

  // OPTIONAL
  ttl: "", //max time in minutes to cache the feed items

  // category Settings
  categorySettings: {
    Featured: {
      sectionTitle: "Deals of the Day",
      buttonLabel: "View All",
      expireTime: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5
    },
    Imagery: {
      textColor: "#31608f",
      patternUrl: ""
    }
  },
  items: [
    {
      id: "", // itemid
      title: "Min.60% + Extra5%Off",
      description: "",
      category: "Energy Drinks",
      image: {
        // urls of the image in various sizes
        xs: "./extern/BlackandBold.png",
        s: "./extern/BlackandBold.png",
        m: "./extern/BlackandBold.png",
        l: "./extern/BlackandBold.png",
        xl: "./extern/BlackandBold.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Cajun Boiled Peanuts",
      description: "Min 40% off",
      category: "Daily food delights",
      image: {
        // urls of the image in various sizes
        xs: "./extern/New Nuts Cajun.png",
        s: "./extern/New Nuts Cajun.png",
        m: "./extern/New Nuts Cajun.png",
        l: "./extern/New Nuts Cajun.png",
        xl: "./extern/New Nuts Cajun.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Barber's 2% Milk",
      description: "Min 30% off",
      category: "Dairy products",
      image: {
        // urls of the image in various sizes
        xs: "./extern/Whole Milk.png",
        s: "./extern/Whole Milk.png",
        m: "./extern/Whole Milk.png",
        l: "./extern/Whole Milk.png",
        xl: "./extern/Whole Milk.png"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    }
  ]
};
exports.TitledImageryData = {
  // REQUIRED
  version: "https://jsonfeed.org/version/1", //fixed, per the spec
  id: "", // feed id
  title: "Featured Brands", //feed title
  description: "TitledImageryData", //feed description
  category: "TitledImagery", //feed category
  link: "", //api url

  // OPTIONAL
  ttl: "", //max time in minutes to cache the feed items

  // category Settings
  categorySettings: {
    Featured: {
      sectionTitle: "Deals of the Day",
      buttonLabel: "View All",
      expireTime: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5
    },
    Imagery: {
      textColor: "#31608f",
      patternUrl:
        "https://images.template.net/wp-content/uploads/2015/11/25190801/Hd-Wallpapers-Cool-Plain-Backgrounds-Download.jpg"
    }
  },
  items: [
    {
      id: "", // itemid
      title: "LENOVO Laptop",
      description: "Core 3 laptops",
      category: "Laptops",
      image: {
        // urls of the image in various sizes
        xs:
          "https://rukminim1.flixcart.com/flap/1312/704/image/5724df.jpg?q=70",
        s: "https://rukminim1.flixcart.com/flap/1312/704/image/5724df.jpg?q=70",
        m: "https://rukminim1.flixcart.com/flap/1312/704/image/5724df.jpg?q=70",
        l: "https://rukminim1.flixcart.com/flap/1312/704/image/5724df.jpg?q=70",
        xl: "https://rukminim1.flixcart.com/flap/1312/704/image/5724df.jpg?q=70"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Intel laptops",
      description: "Min 40% off",
      category: "Laptops",
      image: {
        // urls of the image in various sizes
        xs:
          "https://rukminim1.flixcart.com/flap/1312/704/image/3591ea.jpg?q=70",
        s: "https://rukminim1.flixcart.com/flap/1312/704/image/3591ea.jpg?q=70",
        m: "https://rukminim1.flixcart.com/flap/1312/704/image/3591ea.jpg?q=70",
        l: "https://rukminim1.flixcart.com/flap/1312/704/image/3591ea.jpg?q=70",
        xl: "https://rukminim1.flixcart.com/flap/1312/704/image/3591ea.jpg?q=70"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Philips - Trimmers",
      description: "Min 30% off",
      category: "Trimmers",
      image: {
        // urls of the image in various sizes
        xs:
          "https://rukminim1.flixcart.com/flap/1312/704/image/04931e.jpg?q=70",
        s: "https://rukminim1.flixcart.com/flap/1312/704/image/04931e.jpg?q=70",
        m: "https://rukminim1.flixcart.com/flap/1312/704/image/04931e.jpg?q=70",
        l: "https://rukminim1.flixcart.com/flap/1312/704/image/04931e.jpg?q=70",
        xl: "https://rukminim1.flixcart.com/flap/1312/704/image/04931e.jpg?q=70"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    }
  ]
};
exports.HeroData = {
  // REQUIRED
  version: "https://jsonfeed.org/version/1", //fixed, per the spec
  id: "", // feed id
  title: "Hero", //feed title
  description: "HeroData", //feed description
  category: "Hero", //feed category
  link: "", //api url

  // OPTIONAL
  ttl: "", //max time in minutes to cache the feed items

  // category Settings
  categorySettings: {
    Featured: {
      sectionTitle: "Deals of the Day",
      buttonLabel: "View All",
      expireTime: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      noOfProductsToShow: 5,
      noOfProductsToScroll: 5
    },
    Imagery: {
      textColor: "#31608f",
      patternUrl:
        "https://images.template.net/wp-content/uploads/2015/11/25190801/Hd-Wallpapers-Cool-Plain-Backgrounds-Download.jpg"
    }
  },
  items: [
    {
      id: "", // itemid
      title: "LENOVO Laptop",
      description: "Core 3 laptops",
      category: "Laptops",
      image: {
        // urls of the image in various sizes
        xs:
          "https://rukminim1.flixcart.com/flap/3376/560/image/eed9bf.jpg?q=50",
        s: "https://rukminim1.flixcart.com/flap/984/528/image/76c490.jpg?q=90",
        m: "https://rukminim1.flixcart.com/flap/984/528/image/76c490.jpg?q=90",
        l: "https://rukminim1.flixcart.com/flap/3376/560/image/eed9bf.jpg?q=50",
        xl: "https://rukminim1.flixcart.com/flap/3376/560/image/eed9bf.jpg?q=50"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Intel laptops",
      description: "Min 40% off",
      category: "Laptops",
      image: {
        // urls of the image in various sizes
        xs:
          "https://rukminim1.flixcart.com/flap/3376/560/image/3bc9ff.jpg?q=50",
        s: "https://rukminim1.flixcart.com/flap/984/528/image/568105.jpg?q=90",
        m: "https://rukminim1.flixcart.com/flap/984/528/image/568105.jpg?q=90",
        l: "https://rukminim1.flixcart.com/flap/3376/560/image/3bc9ff.jpg?q=50",
        xl: "https://rukminim1.flixcart.com/flap/3376/560/image/3bc9ff.jpg?q=50"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    },
    {
      id: "", // itemid
      title: "Philips - Trimmers",
      description: "Min 30% off",
      category: "Trimmers",
      image: {
        // urls of the image in various sizes
        xs:
          "https://rukminim1.flixcart.com/flap/3376/560/image/444218.jpg?q=50",
        s: "https://rukminim1.flixcart.com/flap/984/528/image/033cc2.jpg?q=90",
        m: "https://rukminim1.flixcart.com/flap/984/528/image/033cc2.jpg?q=90",
        l: "https://rukminim1.flixcart.com/flap/3376/560/image/444218.jpg?q=50",
        xl: "https://rukminim1.flixcart.com/flap/3376/560/image/444218.jpg?q=50"
      },
      actions: {
        //Used for displaying clickable actions, e.g. "Click here" or "See more"
        primary: {
          title: "",
          link: "", // the url for the action, can be relative or absolute.
          icon: ""
        },
        secondary: {
          title: "",
          link: "",
          icon: ""
        }
      },
      createdAt: "" // datetime when this item was added to the feed, used for pagination through "since"
    }
  ]
};

exports.organisationalConfig = {
  logo: "./extern/logo.jpeg",
  title: "Tofa",
  currency: "₹"
};
exports.categories = [
  {
    Code: "C10001",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "Electronics",
    ParentCategoryId: "",
    Tags: "",
    id: "1"
  },
  {
    Code: "C10002",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "TVs & Appliences",
    ParentCategoryId: "",
    Tags: "",
    id: "2"
  },
  {
    Code: "C10003",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "Women",
    ParentCategoryId: "",
    Tags: "",
    id: "3"
  },
  {
    Code: "C10004",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "Baby & Kids",
    ParentCategoryId: "",
    Tags: "",
    id: "4"
  },
  {
    Code: "C10005",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "Home & Furniture",
    ParentCategoryId: "",
    Tags: "",
    id: "5"
  },
  {
    Code: "C10006",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "Mobile",
    ParentCategoryId: "1",
    Tags: "",
    id: "6"
  },
  {
    Code: "C10007",
    Description: "",
    DisplayOrder: 1,
    Image: "",
    IsActive: true,
    Name: "Laptops",
    ParentCategoryId: "1",
    Tags: "",
    id: "7"
  }
];

exports.products = [
  {
    id: "121",
    name: "Lenovo Vibe X3",
    description: "Mobile phone",
    images: [
      "https://gadgetsloud.com/wp-content/uploads/2016/01/Lenovo-Vibe-X3.jpg",
      "https://drop.ndtv.com/TECH/product_database/images/11172015105617AM_635_lenovo_vibe_x3.jpeg",
      "https://img.youtube.com/vi/9pdkoHhEKVc/hqdefault.jpg"
    ],
    categories: ["1", "6"],
    price: 20000,
    discount: 30
  },
  {
    id: "122",
    name: "Moto G5 (White)",
    description: "Mobile phone",
    images: [
      "http://cdn.techpp.com/wp-content/uploads/2017/04/moto-g5-review-1.jpg"
    ],
    categories: ["1", "6"],
    price: 14500,
    discount: 10
  },
  {
    id: "123",
    name: "Asus Zenfone Max Pro M1 (Grey, 32 GB)  (3 GB RAM)",
    description: "3 GB RAM | 32 GB ROM | Expandable Upto 2 TB",
    images: [
      "http://www.androidguys.com/wp-content/uploads/2017/08/ZenFone-4-Selfie-Pro.jpg"
    ],
    categories: ["1", "6"],
    price: 10999,
    discount: 10
  },
  {
    id: "124",
    name: "Redmi 5A (Gold, 32 GB)  (3 GB RAM)",
    description: "3 GB RAM | 32 GB ROM | Expandable Upto 128 GB",
    images: [
      "http://images.fonearena.com/blog/wp-content/uploads/2018/01/Alcatel-1X-1024x523.jpg",
      "https://cdn.alzashop.com/ImgW.ashx?fd=f3&cd=ALCT035a",
      "http://pocketnow.com/wp-content/uploads/2018/02/alcatel-3v-leaks.jpg"
    ],
    categories: ["1", "6"],
    price: 6999,
    discount: 10
  },
  {
    id: "125",
    name: "Alcatel 3V (Spectrum Black, 32 GB)  (3 GB RAM)",
    description: "3 GB RAM | 32 GB ROM | Expandable Upto 128 GB",
    images: [
      "http://cdn.techpp.com/wp-content/uploads/2017/04/moto-g5-review-1.jpg"
    ],
    categories: ["1", "6"],
    price: 9999,
    discount: 10
  }
];
