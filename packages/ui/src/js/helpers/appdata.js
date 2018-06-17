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
      category: "Women Bags",
      image: {
        // urls of the image in various sizes
        xs: "http://pngimg.com/uploads/women_bag/women_bag_PNG6422.png",
        s: "http://pngimg.com/uploads/women_bag/women_bag_PNG6422.png",
        m: "http://pngimg.com/uploads/women_bag/women_bag_PNG6422.png",
        l: "http://pngimg.com/uploads/women_bag/women_bag_PNG6422.png",
        xl: "http://pngimg.com/uploads/women_bag/women_bag_PNG6422.png"
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
      title: "Trophy",
      description: "Min 40% off",
      category: "Congratulation",
      image: {
        // urls of the image in various sizes
        xs:
          "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/10/gold-trophy-transparent-background.png?fit=486%2C598",
        s:
          "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/10/gold-trophy-transparent-background.png?fit=486%2C598",
        m:
          "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/10/gold-trophy-transparent-background.png?fit=486%2C598",
        l:
          "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/10/gold-trophy-transparent-background.png?fit=486%2C598",
        xl:
          "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/10/gold-trophy-transparent-background.png?fit=486%2C598"
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
      title: "Pillow",
      description: "Min 30% off",
      category: "Handmade",
      image: {
        // urls of the image in various sizes
        xs:
          "http://cdn.shopify.com/s/files/1/2097/8619/products/il_570xN.1218948774_lw99_la_grande.gif?v=1512667119",
        s:
          "http://cdn.shopify.com/s/files/1/2097/8619/products/il_570xN.1218948774_lw99_la_grande.gif?v=1512667119",
        m:
          "http://cdn.shopify.com/s/files/1/2097/8619/products/il_570xN.1218948774_lw99_la_grande.gif?v=1512667119",
        l:
          "http://cdn.shopify.com/s/files/1/2097/8619/products/il_570xN.1218948774_lw99_la_grande.gif?v=1512667119",
        xl:
          "http://cdn.shopify.com/s/files/1/2097/8619/products/il_570xN.1218948774_lw99_la_grande.gif?v=1512667119"
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
      title: "Philips - Trimmers",
      description: "Min 30% off",
      category: "Trimmers",
      image: {
        // urls of the image in various sizes
        xs:
          "https://worldartcommunity.com/images/shop-images/shop_banner_c3b25357ecfc76d3664c10b120822f1b.jpg",
        s:
          "https://worldartcommunity.com/images/shop-images/shop_banner_c3b25357ecfc76d3664c10b120822f1b.jpg",
        m:
          "https://worldartcommunity.com/images/shop-images/shop_banner_c3b25357ecfc76d3664c10b120822f1b.jpg",
        l:
          "https://worldartcommunity.com/images/shop-images/shop_banner_c3b25357ecfc76d3664c10b120822f1b.jpg",
        xl:
          "https://worldartcommunity.com/images/shop-images/shop_banner_c3b25357ecfc76d3664c10b120822f1b.jpg"
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
      title: "LENOVO Laptop",
      description: "Core 3 laptops",
      category: "Laptops",
      image: {
        // urls of the image in various sizes
        xs:
          "https://static.theworks.co.uk/static-images/espot/top-banner/christmas-craft-banner-3105.jpg",
        s:
          "https://static.theworks.co.uk/static-images/espot/top-banner/christmas-craft-banner-3105.jpg",
        m:
          "https://static.theworks.co.uk/static-images/espot/top-banner/christmas-craft-banner-3105.jpg",
        l:
          "https://static.theworks.co.uk/static-images/espot/top-banner/christmas-craft-banner-3105.jpg",
        xl:
          "https://static.theworks.co.uk/static-images/espot/top-banner/christmas-craft-banner-3105.jpg"
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
          "https://www.hobbyideas.in/assets/v2/img/upload-craft-creations.jpg",
        s: "https://www.hobbyideas.in/assets/v2/img/upload-craft-creations.jpg",
        m: "https://www.hobbyideas.in/assets/v2/img/upload-craft-creations.jpg",
        l: "https://www.hobbyideas.in/assets/v2/img/upload-craft-creations.jpg",
        xl: "https://www.hobbyideas.in/assets/v2/img/upload-craft-creations.jpg"
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
