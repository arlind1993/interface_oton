interface Resources {
  "en-US": {
    "account": {
      "cloud": {
        "backup": {
          "subtitle": "There are multiple recovery phrases backed up to your {{cloudProviderName}}.",
          "title": "Select a backup to restore"
        },
        "button": {
          "restore": {
            "android": "Restore from Google Drive",
            "ios": "Restore from iCloud"
          }
        },
        "empty": {
          "description": "It looks like you haven’t backed up any of your recovery phrases to {{cloudProviderName}}.",
          "title": "0 backups found"
        },
        "error": {
          "backup": {
            "message": "Failed to import backups due to lack of permissions, interruption of authorization, or due to a cloud error",
            "title": "Error while importing backups"
          },
          "password": {
            "title": "Invalid password. Please try again."
          },
          "unavailable": {
            "button": {
              "cancel": "Not now",
              "settings": "Go to settings"
            },
            "message": {
              "android": "Please verify that you are logged in to a Google account with Google Drive enabled on this device and try again.",
              "ios": "Please verify that you are logged in to an Apple ID with iCloud Drive enabled on this device and try again."
            },
            "title": {
              "android": "Google Drive not available",
              "ios": "iCloud Drive not available"
            }
          }
        },
        "loading": {
          "title": "Searching for backups..."
        },
        "lockout": {
          "time": {
            "hours_one": "Too many attempts. Try again in 1 hour.",
            "hours_other": "Too many attempts. Try again in {{count}} hours.",
            "minutes_one": "Too many attempts. Try again in 1 minute.",
            "minutes_other": "Too many attempts. Try again in {{count}} minutes."
          }
        },
        "password": {
          "input": "Enter password",
          "recoveryPhrase": "Enter your recovery phrase instead",
          "subtitle": "This password is required to recover your recovery phrase backup from {{cloudProviderName}}.",
          "title": "Enter backup password"
        }
      },
      "recoveryPhrase": {
        "education": {
          "part1": "A recovery phrase (or seed phrase) is a <highlight>set of words</highlight> required to access your wallet, <highlight>like a password.</highlight>",
          "part2": "You can <highlight>enter</highlight> your recovery phrase on a new device <highlight>to restore your wallet</highlight> and its contents.",
          "part3": "But, if you <highlight>lose your recovery phrase</highlight>, you’ll <highlight>lose access</highlight> to your wallet.",
          "part4": "Instead of memorizing your recovery phrase, you can <highlight>back it up to {{cloudProviderName}}</highlight> and protect it with a password.",
          "part5": "You can also manually back up your recovery phrase by <highlight>writing it down</highlight> and storing it in a safe place.",
          "part6": "We recommend using <highlight>both types of backups</highlight>, because if you lose your recovery phrase, you won’t be able to restore your wallet."
        },
        "error": {
          "invalid": "Invalid phrase",
          "invalidWord": "Invalid word: {{word}}",
          "phraseLength": "Recovery phrase must be 12-24 words",
          "wrong": "Wrong recovery phrase"
        },
        "helpText": {
          "import": "How do I find my recovery phrase?",
          "restoring": "Try searching again"
        },
        "input": "Type your recovery phrase",
        "remove": {
          "final": {
            "description": "Make sure you’ve written down your recovery phrase or backed it up on {{cloudProviderName}}. <highlight>You will not be able to access your funds otherwise.</highlight>",
            "title": "You’re removing your <highlight>recovery phrase</highlight>"
          },
          "import": {
            "description": "You can only store one recovery phrase at a time. To continue importing a new one, you’ll need to remove your current recovery phrase and any associated wallets from this device."
          },
          "initial": {
            "description": "This will remove your wallet from this device along with your recovery phrase.",
            "title": "You’re removing <highlight>{{walletName}}</highlight>"
          },
          "mnemonic": {
            "description": "It shares the same recovery phrase as <highlight>{{walletNames}}</highlight>. Your recovery phrase will remain stored until you delete all remaining wallets."
          }
        },
        "subtitle": {
          "import": "Your recovery phrase will only be stored locally on your device.",
          "restoring": "Enter your recovery phrase below, or try searching for backups again."
        },
        "title": {
          "import": "Enter your recovery phrase",
          "restoring": "No backups found"
        }
      },
      "wallet": {
        "action": {
          "copy": "Copy wallet address",
          "report": "Report profile",
          "settings": "Wallet settings",
          "viewExplorer": "View on {{blockExplorerName}}"
        },
        "button": {
          "add": "Add wallet",
          "addViewOnly": "Add a view-only wallet",
          "create": "Create a new wallet",
          "import": "Import a new wallet",
          "manage": "Manage wallet",
          "remove": "Remove wallet",
          "restore": "Restore wallet",
          "watch": "Watch a wallet"
        },
        "header": {
          "other": "Your other wallets",
          "viewOnly": "View only wallets"
        },
        "remove": {
          "check": "I backed up my recovery phrase and understand that Uniswap Labs can’t help me recover my wallets if I failed to do so.",
          "viewOnly": "You can always add back view-only wallets by entering the wallet’s address."
        },
        "restore": {
          "description": "Because you’re on a new device, you’ll need to restore your recovery phrase. This will allow you to swap and send tokens."
        },
        "select": {
          "error": "Couldn’t load addresses",
          "loading": {
            "subtitle": "Your wallets will appear below.",
            "title": "Searching for wallets"
          },
          "title_one_one": "One wallet found",
          "title_one_other": "Select wallets to import"
        },
        "title": "Your wallets",
        "viewOnly": {
          "button": "Import wallet",
          "description": "To swap, buy, send, and receive tokens, you need to import this wallet’s recovery phrase.",
          "title": "This wallet is view-only"
        },
        "watch": {
          "error": {
            "alreadyImported": "This address is already imported",
            "notFound": "Address not found",
            "smartContract": "Address is a smart contract"
          },
          "message": "Adding a view-only wallet allows you to try out the app or track a wallet. You will not be able to swap or send funds.",
          "placeholder": "ENS or address",
          "title": "Enter a wallet address"
        }
      }
    },
    "common": {
      "app": "Uniswap Wallet",
      "button": {
        "accept": "Accept",
        "back": "Back",
        "buy": "Buy",
        "cancel": "Cancel",
        "close": "Close",
        "confirm": "Confirm",
        "connect": "Connect",
        "continue": "Continue",
        "copied": "Copied",
        "copy": "Copy",
        "delete": "Delete",
        "disconnect": "Disconnect",
        "dismiss": "Dismiss",
        "done": "Done",
        "enable": "Enable",
        "hide": "Hide",
        "later": "Maybe later",
        "learn": "Learn more",
        "next": "Next",
        "notNow": "Not now",
        "ok": "OK",
        "paste": "Paste",
        "receive": "Receive",
        "remove": "Remove",
        "restore": "Restore",
        "retry": "Retry",
        "review": "Review",
        "save": "Save",
        "sell": "Sell",
        "send": "Send",
        "setup": "Set up",
        "share": "Share",
        "show": "Show",
        "sign": "Sign",
        "skip": "Skip",
        "swap": "Swap",
        "tryAgain": "Try again",
        "understand": "I understand",
        "view": "View"
      },
      "card": {
        "error": {
          "description": "Something went wrong",
          "title": "Oops! Something went wrong."
        }
      },
      "error": {
        "general": "Something went wrong."
      },
      "input": {
        "password": {
          "confirm": "Confirm password",
          "error": {
            "mismatch": "Passwords don’t match",
            "weak": "This password is too weak"
          },
          "new": "New password",
          "placeholder": "Password",
          "strength": {
            "medium": "Medium",
            "strong": "Strong",
            "weak": "Weak"
          }
        },
        "search": "Search"
      },
      "longText": {
        "button": {
          "less": "Read less",
          "more": "Read more"
        }
      },
      "navigation": {
        "settings": "Settings",
        "systemSettings": "Settings"
      },
      "text": {
        "error": "Error",
        "loading": "Loading",
        "notAvailable": "N/A",
        "unknown": "Unknown"
      }
    },
    "currency": {
      "aud": "Australian Dollar",
      "brl": "Brazilian Real",
      "cad": "Canadian Dollar",
      "cny": "Chinese Yuan",
      "eur": "Euro",
      "gbp": "British Pound",
      "hkd": "Hong Kong Dollar",
      "idr": "Indonesian Rupiah",
      "inr": "Indian Rupee",
      "jpy": "Japanese Yen",
      "ngn": "Nigerian Naira",
      "pkr": "Pakistani Rupee",
      "rub": "Russian Ruble",
      "sgd": "Singapore Dollar",
      "thb": "Thai Baht",
      "try": "Turkish Lira",
      "uah": "Ukrainian Hryvnia",
      "usd": "United States Dollar",
      "vnd": "Vietnamese Dong"
    },
    "dapp": {
      "request": {
        "approve": {
          "label": "Wallet"
        },
        "error": {
          "none": "No approvals pending"
        },
        "signature": {
          "education": {
            "description": "A signature is required to prove that you own the wallet without exposing your private keys",
            "title": "What’s a signature request?"
          }
        },
        "warning": {
          "notActive": {
            "message": "Make sure it’s the right one",
            "title": "This is not your active wallet"
          }
        }
      }
    },
    "errors": {
      "crash": {
        "message": "Something crashed.",
        "restart": "Restart app",
        "title": "Uh oh!"
      }
    },
    "explore": {
      "search": {
        "action": {
          "clear": "Clear all",
          "viewEtherscan": "View on {{blockExplorerName}}"
        },
        "empty": {
          "full": "No results found for <highlight>\"{{searchQuery}}\"</highlight>"
        },
        "error": "Couldn’t load search results",
        "label": {
          "ownedBy": "Owned by {{ownerAddress}}"
        },
        "placeholder": "Search tokens and wallets",
        "section": {
          "nft": "NFT Collections",
          "popularNFT": "Popular NFT collections",
          "popularTokens": "Popular tokens",
          "recent": "Recent searches",
          "suggestedWallets": "Suggested wallets",
          "tokens": "Tokens",
          "wallets": "Wallets"
        }
      },
      "tokens": {
        "error": "Couldn’t load tokens",
        "favorite": {
          "action": {
            "add": "Favorite token",
            "edit": "Edit favorites",
            "remove": "Remove favorite"
          },
          "title": {
            "default": "Favorite tokens",
            "edit": "Edit favorite tokens"
          }
        },
        "metadata": {
          "marketCap": "{{number}} MCap",
          "totalValueLocked": "{{number}} TVL",
          "volume": "{{number}} Vol"
        },
        "sort": {
          "label": {
            "marketCap": "Market cap",
            "priceDecrease": "Price decrease",
            "priceIncrease": "Price increase",
            "totalValueLocked": "TVL",
            "volume": "Volume"
          },
          "option": {
            "marketCap": "Market cap",
            "priceDecrease": "Price decrease (24H)",
            "priceIncrease": "Price increase (24H)",
            "totalValueLocked": "Uniswap TVL",
            "volume": "Uniswap volume (24H)"
          }
        },
        "top": {
          "title": "Top tokens"
        }
      },
      "wallets": {
        "favorite": {
          "action": {
            "add": "Favorite wallet",
            "edit": "Edit favorites",
            "remove": "Remove favorite"
          },
          "title": {
            "default": "Favorite wallets",
            "edit": "Edit favorite wallets"
          }
        }
      }
    },
    "extension": {
      "connection": {
        "popup": "Your wallet isn’t connected to this site.",
        "popupWithButton": "Your wallet isn’t connected to this site. Look for a “Connect Wallet” or “Log in” button."
      },
      "lock": {
        "button": {
          "forgot": "Forgot password?",
          "help": "Get help",
          "recoveryPhrase": "Enter recovery phrase",
          "submit": "Unlock"
        },
        "password": {
          "error": "Wrong password. Try again",
          "reset": {
            "description": {
              "default": "To reset your password, enter your wallet’s recovery phrase. Uniswap cannot help recover your password.",
              "inProgress": "Follow the instructions on the browser web page to reset your password"
            },
            "title": "Forgot password?"
          }
        },
        "subtitle": "Enter your password to unlock",
        "title": "Welcome back"
      },
      "settings": {
        "password": {
          "enter": {
            "title": "Enter your current password"
          },
          "error": {
            "wrong": "Wrong password"
          },
          "placeholder": "Current password"
        }
      }
    },
    "fiatOnRamp": {
      "button": {
        "chooseToken": "Choose a token",
        "continueCheckout": "Continue to checkout"
      },
      "checkout": {
        "button": "Checkout",
        "title": "Checkout with"
      },
      "connection": {
        "message": "Connecting you to {{serviceProvider}}",
        "quote": "Buying {{amount}} worth of {{currencySymbol}}"
      },
      "error": {
        "default": "Something went wrong.",
        "load": "Couldn’t load tokens to buy",
        "max": "Maximum {{amount}}",
        "min": "Minimum {{amount}}",
        "unsupported": "Not supported in region",
        "usd": "Only available to purchase in USD"
      },
      "quote": {
        "amount": "Receive {{tokenAmount}}",
        "amountAfterFees": "{{tokenAmount}} after fees",
        "type": {
          "best": "Best overall",
          "other": "Other options",
          "recent": "Recently used"
        }
      },
      "region": {
        "placeholder": "Search by country or region",
        "title": "Select your region"
      },
      "summary": {
        "total": "{{cryptoAmount}} for {{fiatAmount}}"
      }
    },
    "forceUpgrade": {
      "action": {
        "confirm": "Update app",
        "recoveryPhrase": "View recovery phrase"
      },
      "description": "The version of Uniswap Wallet you’re using is out of date and is missing critical upgrades. If you don’t update the app or you don’t have your recovery phrase written down, you won’t be able to access your assets.",
      "label": {
        "recoveryPhrase": "Recovery phrase"
      },
      "title": "Update the app to continue"
    },
    "home": {
      "activity": {
        "empty": {
          "button": "Receive tokens or NFTs",
          "description": {
            "default": "When you approve, trade, or transfer tokens or NFTs, your transactions will appear here.",
            "external": "When this wallet makes transactions, they’ll appear here."
          },
          "title": "No activity yet"
        },
        "error": {
          "load": "Couldn’t load activity"
        },
        "title": "Activity"
      },
      "banner": {
        "offline": "You are in offline mode"
      },
      "extension": {
        "error": "Error loading accounts",
        "pin": "Pin Uniswap Wallet to your browser toolbar by clicking on the <puzzleIcon />"
      },
      "feed": {
        "empty": {
          "description": "When your favorited wallets makes transactions, they’ll appear here.",
          "title": "No activity yet"
        },
        "error": "Couldn’t load activity",
        "title": "Feed"
      },
      "label": {
        "buy": "Buy",
        "receive": "Receive",
        "scan": "Scan",
        "send": "Send",
        "swap": "Swap"
      },
      "nfts": {
        "title": "NFTs"
      },
      "tokens": {
        "empty": {
          "action": {
            "buy": {
              "description": "You’ll need ETH to get started. Buy with a card or bank.",
              "title": "Buy crypto"
            },
            "import": {
              "description": "Enter this wallet’s recovery phrase to begin swapping and sending.",
              "title": "Import wallet"
            },
            "receive": {
              "description": "Transfer tokens from another wallet or crypto exchange.",
              "title": "Receive funds"
            }
          },
          "description": "When this wallet buys or receives tokens, they’ll appear here.",
          "title": "No tokens yet"
        },
        "error": {
          "fetch": "Failed to fetch token balances",
          "load": "Couldn’t load token balances"
        },
        "title": "Tokens"
      },
      "upsell": {
        "receive": {
          "cta": "Link an account",
          "description": "Fund your wallet by transferring crypto from another wallet or account",
          "title": "Receive crypto"
        }
      },
      "warning": {
        "viewOnly": "This is a view-only wallet"
      }
    },
    "language": {
      "chineseSimplified": "Chinese, Simplified",
      "chineseTraditional": "Chinese, Traditional",
      "dutch": "Dutch",
      "english": "English",
      "french": "French",
      "hindi": "Hindi",
      "indonesian": "Indonesian",
      "japanese": "Japanese",
      "malay": "Malay",
      "portuguese": "Portuguese",
      "russian": "Russian",
      "spanishLatam": "Spanish (Latin America)",
      "spanishSpain": "Spanish (Spain)",
      "spanishUs": "Spanish (US)",
      "thai": "Thai",
      "turkish": "Turkish",
      "ukrainian": "Ukrainian",
      "urdu": "Urdu",
      "vietnamese": "Vietnamese"
    },
    "notification": {
      "assetVisibility": {
        "hidden": "{{assetName}} hidden",
        "unhidden": "{{assetName}} unhidden"
      },
      "copied": {
        "address": "Address copied",
        "contractAddress": "Contract address copied",
        "failed": "Failed to copy to clipboard",
        "image": "Image copied",
        "transactionId": "Transaction ID copied"
      },
      "countryChange": "Switched to {{countryName}}",
      "restore": {
        "success": "Wallet restored!"
      },
      "swap": {
        "network": "Swapping on {{network}}",
        "pending": {
          "swap": "Swap pending",
          "unwrap": "Unwrap pending",
          "wrap": "Wrap pending"
        }
      },
      "transaction": {
        "approve": {
          "canceled": "Canceled {{currencySymbol}} approve.",
          "fail": "Failed to approve {{currencySymbol}} for use with {{address}}.",
          "success": "Approved {{currencySymbol}} for use with {{address}}."
        },
        "swap": {
          "canceled": "Canceled {{inputCurrencySymbol}}-{{outputCurrencySymbol}} swap.",
          "fail": "Failed to swap {{inputCurrencyAmountWithSymbol}} for {{outputCurrencyAmountWithSymbol}}.",
          "success": "Swapped {{inputCurrencyAmountWithSymbol}} for {{outputCurrencyAmountWithSymbol}}."
        },
        "transfer": {
          "canceled": "Canceled {{tokenNameOrAddress}} send.",
          "fail": "Failed to send {{tokenNameOrAddress}} to {{walletNameOrAddress}}.",
          "received": "Received {{tokenNameOrAddress}} from {{walletNameOrAddress}}.",
          "success": "Sent {{tokenNameOrAddress}} to {{walletNameOrAddress}}."
        },
        "unknown": {
          "fail": {
            "full": "Failed to transact with {{addressOrEnsName}}",
            "short": "Failed to transact"
          },
          "success": {
            "full": "Transacted with {{addressOrEnsName}}",
            "short": "Transacted"
          }
        },
        "unwrap": {
          "canceled": "Canceled {{inputCurrencySymbol}} unwrap.",
          "fail": "Failed to unwrap {{inputCurrencyAmountWithSymbol}}.",
          "success": "Unwrapped {{inputCurrencyAmountWithSymbol}} and received {{outputCurrencyAmountWithSymbol}}."
        },
        "wrap": {
          "canceled": "Canceled {{inputCurrencySymbol}} wrap.",
          "fail": "Failed to wrap {{inputCurrencyAmountWithSymbol}}.",
          "success": "Wrapped {{inputCurrencyAmountWithSymbol}} and received {{outputCurrencyAmountWithSymbol}}."
        }
      },
      "transfer": {
        "pending": "{{currencySymbol}} transfer pending"
      },
      "walletConnect": {
        "confirmed": "Transaction confirmed with {{dappName}}",
        "connected": "Connected",
        "disconnected": "Disconnected",
        "failed": "Transaction failed with {{dappName}}",
        "networkChanged": {
          "full": "Switched to {{networkName}}",
          "short": "Switched networks"
        }
      }
    },
    "notifications": {
      "scantastic": {
        "subtitle": "Continue on Oton Extension",
        "title": "Success"
      }
    },
    "onboarding": {
      "backup": {
        "manual": {
          "placeholder": "Secret word",
          "progress": "{{completedStepsCount}}/{{totalStepsCount}} completed",
          "subtitle_one": "What’s the <highlight/>{{count}}st</highlight/> word in your recovery phrase?",
          "subtitle_two": "What’s the <highlight/>{{count}}nd</highlight/> word in your recovery phrase?",
          "subtitle_few": "What’s the <highlight/>{{count}}rd</highlight/> word in your recovery phrase?",
          "subtitle_other": "What’s the <highlight/>{{count}}th</highlight/> word in your recovery phrase?",
          "title": "Let’s make sure you’ve recorded it correctly"
        },
        "option": {
          "cloud": {
            "description": "Encrypt your recovery phrase with a secure password",
            "title": "{{cloudProviderName}} backup"
          },
          "manual": {
            "description": "Write your recovery phrase down and store it in a safe location",
            "title": "Manual backup"
          }
        },
        "subtitle": "Backups let you restore your wallet if you delete the app or lose your device",
        "title": {
          "existing": "Back up your wallet",
          "new": "Choose a backup method"
        },
        "view": {
          "disclaimer": "I understand that if I lose my recovery phrase, Uniswap Labs cannot help me restore it",
          "subtitle": {
            "write": "Read the following carefully before continuing"
          },
          "title": "Save your recovery phrase",
          "warning": {
            "message1": "This recovery phrase gives you full access to your wallet and funds",
            "message2": "Write it down and keep it in a safe place",
            "message3": "View this in private and <u>do not share it with anyone</u>"
          }
        }
      },
      "cloud": {
        "confirm": {
          "description": "You’ll need to enter this password to recover your account. It’s not stored anywhere, so it can’t be recovered by anyone else.",
          "title": "Confirm your backup password"
        },
        "createPassword": {
          "description": "You’ll need to enter this password to recover your wallet.",
          "title": "Create your backup password"
        }
      },
      "complete": {
        "card": {
          "buy": {
            "description": "Purchase with a card, or transfer from an exchange",
            "title": "Buy or transfer crypto"
          },
          "explore": {
            "description": "Search and browse trending tokens and NFTs",
            "title": "Explore tokens & NFTs"
          },
          "swap": {
            "description": "Purchase with a card, or transfer from an exchange",
            "title": "Start swapping"
          }
        },
        "description": "Your wallet is ready! Start by funding your wallet by buying or transferring crypto to your wallet.",
        "footer": "Learn how to use the Uniswap Wallet",
        "pin": "<text>Pin the extension to your browser window</text><container><text>by clicking on the </text><puzzleIcon /><text> icon, and then the pin</text></container>"
      },
      "editName": {
        "button": {
          "create": "Create wallet"
        },
        "label": "Nickname",
        "subtitle": "Give your wallet a nickname",
        "title": "This nickname is only visible to you",
        "walletAddress": "Your public address will be <highlight>{{walletAddress}}</highlight>"
      },
      "extension": {
        "connectMobile": {
          "button": "Import from your phone",
          "title": "Have the Uniswap mobile app?"
        },
        "password": {
          "subtitle": "You’ll need this to unlock your wallet and access your recovery phrase",
          "title": {
            "default": "Create a password",
            "reset": "Reset your password"
          }
        }
      },
      "import": {
        "error": {
          "invalidWords_one": "1 word is invalid or misspelled",
          "invalidWords_other": "{{count}} words are invalid or misspelled"
        },
        "method": {
          "import": {
            "message": "Enter your recovery phrase from another crypto wallet",
            "title": "Import a wallet"
          },
          "restore": {
            "message": {
              "android": "Add wallets you’ve backed up to your Google Drive account",
              "ios": "Add wallets you’ve backed up to your iCloud account"
            },
            "title": "Restore a wallet"
          }
        },
        "title": "Choose how you want to add your wallet"
      },
      "importMnemonic": {
        "button": {
          "default": "My recovery phrase is 12 words",
          "longPhrase": "My recovery phrase is longer than 12 words"
        },
        "error": {
          "invalidPhrase": "The phrase you entered is invalid"
        },
        "subtitle": "Type or paste your 12-word recovery phrase",
        "title": "Enter your recovery phrase"
      },
      "intro": {
        "alreadyComplete": {
          "subtitle": "To create more wallets, open the account switcher inside the extension popup, or reinstall the extension to start over",
          "title": "You’ve already completed onboarding"
        },
        "button": {
          "alreadyHave": "I already have a wallet"
        },
        "title": "Welcome to \nUniswap Wallet"
      },
      "landing": {
        "button": {
          "add": "Add an existing wallet",
          "create": "Create a new wallet"
        }
      },
      "notification": {
        "permission": {
          "message": "To receive notifications, turn on notifications for Uniswap Wallet in your device’s settings.",
          "title": "Notifications permission"
        },
        "subtitle": "Get notified when your transfers, swaps, and approvals complete.",
        "title": "Turn on push notifications"
      },
      "recoveryPhrase": {
        "confirm": {
          "subtitle": {
            "combined": "Confirm your recovery phrase. Select the missing words in order.",
            "default": "Select the missing words in order."
          },
          "title": "Confirm your recovery phrase"
        },
        "view": {
          "subtitle": "You can check this in settings at any time.",
          "title": "Write down your recovery phrase in order"
        },
        "warning": {
          "final": {
            "button": "I’m ready",
            "message": "Your recovery phrase is what grants you (and anyone who has it) access to your funds. Be sure to keep it to yourself.",
            "title": "Do this step in a private place"
          },
          "screenshot": {
            "message": "Anyone who gains access to your photos can access your wallet. We recommend that you write down your words instead.",
            "title": "Screenshots aren’t secure"
          }
        }
      },
      "resetPassword": {
        "complete": {
          "safety": "Learn more about wallet safety",
          "subtitle": "Use your new password to unlock your wallet.",
          "title": "Password reset"
        }
      },
      "scan": {
        "button": "Scan with Uniswap app",
        "error": "Sorry, we are unable to load the QR code right now. Please try another onboarding method.",
        "otp": {
          "error": "The code you submitted is incorrect, or there was an error submitting. Please try again.",
          "failed": "Failed attempts: {{count}}",
          "subtitle": "Check your Uniswap mobile app for the 6-character code",
          "title": "Enter one-time code"
        },
        "subtitle": "Scan the QR code with the Uniswap app to import your wallet",
        "title": "Sync from your phone"
      },
      "security": {
        "alert": {
          "biometrics": {
            "message": {
              "android": "To use biometrics, set up it first in settings",
              "ios": "To use {{biometricsMethod}}, allow access in system settings"
            },
            "title": {
              "android": "Biometrics is disabled",
              "ios": "{{biometricsMethod}} is disabled"
            }
          }
        },
        "button": {
          "confirm": {
            "android": "Enable biometrics",
            "ios": "Enable {{biometricsMethod}}"
          },
          "setup": "Set up"
        },
        "subtitle": {
          "android": "Add an extra layer of security by requiring biometrics to send transactions.",
          "ios": "Add an extra layer of security by requiring {{biometricsMethod}} to send transactions."
        },
        "title": "Protect your wallet"
      },
      "selectWallets": {
        "error": "Couldn’t load addresses",
        "title": {
          "default": "Choose wallets to import",
          "error": "Error importing wallets"
        }
      },
      "termsOfService": "By continuing, I agree to the<highlightTerms> Terms of Service </highlightTerms>and consent to the<highlightPrivacy> Privacy Policy</highlightPrivacy>.",
      "tooltip": {
        "recoveryPhrase": {
          "trigger": "What’s a recovery phrase?"
        }
      },
      "wallet": {
        "continue": "Let’s keep it safe",
        "defaultName": "Wallet {{number}}",
        "description": {
          "existing": "Check out your tokens and NFTs, follow crypto wallets, and stay up to date on the go.",
          "full": "This is your personal space for tokens, NFTs, and all of your trades. Finish setting it up to keep your funds safe.",
          "new": "Your personal space for tokens, NFTs, and all your trades."
        },
        "title": "Welcome to your new wallet"
      }
    },
    "qrScanner": {
      "button": {
        "connections_one": "1 app connected",
        "connections_other": "{{count}} apps connected"
      },
      "error": {
        "camera": {
          "message": "To scan a code, allow Camera access in system settings",
          "title": "Camera is disabled"
        },
        "none": "No QR code found"
      },
      "recipient": {
        "action": {
          "scan": "Scan a QR code",
          "show": "Show my QR code"
        },
        "error": {
          "message": "Make sure that you’re scanning a valid Ethereum address QR code before trying again.",
          "title": "Invalid QR Code"
        },
        "input": {
          "placeholder": "Search ENS or address"
        },
        "label": {
          "send": "Send"
        },
        "results": {
          "empty": "No results found",
          "error": "The address you typed either does not exist or is spelled incorrectly."
        }
      },
      "request": {
        "message": {
          "unavailable": "No message found."
        },
        "method": {
          "default": "Request from {{dappNameOrUrl}}",
          "signature": "Signature request from {{dappNameOrUrl}}",
          "transaction": "Transaction request from {{dappNameOrUrl}}"
        },
        "withAmount": "Allow {{dappName}} to use up to<highlight> {{amount}} </highlight>{{currencySymbol}}?",
        "withoutAmount": "Allow {{dappName}} to use your {{currencySymbol}}?"
      },
      "status": {
        "connecting": "Connecting...",
        "loading": "Loading..."
      },
      "title": "Scan a QR code",
      "wallet": {
        "networks": {
          "description": "Uniswap Wallet supports tokens on Ethereum, Polygon, Arbitrum, Optimism, Base, and BNB Chain. Right now, we only support NFTs on Ethereum.",
          "title": "Supported Networks"
        },
        "title": "You can send tokens on all of our supported networks to this address."
      }
    },
    "scantastic": {
      "code": {
        "expired": "Expired",
        "subtitle": "Enter this code in the Uniswap Extension. Your recovery phrase will be safely encrypted and transferred.",
        "timeRemaining": {
          "shorthand": {
            "hours": "New code in {{hours}}h {{minutes}}m {{seconds}}s",
            "minutes": "New code in {{minutes}}m {{seconds}}s",
            "seconds": "New code in {{seconds}}s"
          }
        },
        "title": "Uniswap one-time code"
      },
      "confirmation": {
        "button": {
          "continue": "Yes, continue"
        },
        "label": {
          "browser": "Browser",
          "device": "Device"
        },
        "subtitle": "Only continue if you are syncing with the Uniswap Extension on a trusted device.",
        "title": "Is this your device?"
      },
      "error": {
        "encryption": "Failed to prepare seed phrase.",
        "noCode": "No OTP received. Please try again.",
        "timeout": {
          "message": "Scan the QR code on the Uniswap Extension again to continue syncing your wallet.",
          "title": "Your connection timed out"
        }
      }
    },
    "send": {
      "button": {
        "review": "Review transfer",
        "send": "Send"
      },
      "recipient": {
        "previous_one": "{{count}} previous transfer",
        "previous_other": "{{count}} previous transfers",
        "section": {
          "favorite": "Favorite wallets",
          "recent": "Recent",
          "search": "Search results",
          "yours": "Your wallets"
        }
      },
      "review": {
        "summary": {
          "sending": "Sending",
          "to": "To"
        }
      },
      "search": {
        "empty": {
          "subtitle": "The address you typed either does not exist or is spelled incorrectly.",
          "title": "No results found"
        },
        "placeholder": "Search ENS or address"
      },
      "status": {
        "fail": {
          "description": "Keep in mind that the network fee is still charged for failed transfers."
        },
        "failed": {
          "title": "Send failed"
        },
        "inProgress": {
          "description": "We’ll notify you once your transaction is complete.",
          "title": "Sending"
        },
        "success": {
          "description": "You sent {{currencyAmount}}{{tokenName}}{{fiatValue}} to {{recipient}}.",
          "title": "Send successful!"
        }
      },
      "title": "Send",
      "warning": {
        "blocked": {
          "default": "This wallet is blocked",
          "modal": {
            "message": "This address is blocked on Oton Wallet because it is associated with one or more blocked activities. If you believe this is an error, please email compliance@uniswap.org.",
            "title": "Blocked address"
          },
          "recipient": "Recipient wallet is blocked"
        },
        "insufficientFunds": {
          "message": "Your {{currencySymbol}} balance has decreased since you entered the amount you’d like to send",
          "title": "Not enough {{currencySymbol}}."
        },
        "newAddress": {
          "message": "You haven’t transacted with this address before. Please confirm that the address is correct before continuing.",
          "title": "New address"
        },
        "restore": "Restore your wallet to send",
        "smartContract": {
          "message": "You’re about to send tokens to a special type of address—a smart contract. Double-check it’s the address you intended to send to. If it’s wrong, your tokens could be lost forever.",
          "title": "Is this a wallet address?"
        },
        "viewOnly": {
          "message": "You need to import this wallet via recovery phrase to send assets.",
          "title": "This wallet is view-only"
        }
      }
    },
    "setting": {
      "recoveryPhrase": {
        "account": {
          "show": "Show recovery phrase"
        },
        "action": {
          "hide": "Hide recovery phrase"
        },
        "remove": {
          "button": "Remove recovery phrase",
          "confirm": {
            "subtitle": "I understand that Uniswap Labs can’t help me recover my wallet if I failed to do so",
            "title": "I saved my recovery phrase"
          },
          "initial": {
            "subtitle": "Make sure you’ve saved your recovery phrase. You will lose access to your funds otherwise",
            "title": "Before you continue"
          },
          "password": {
            "error": "Wrong password. Try again",
            "input": "Enter password"
          },
          "subtitle": "Enter your password to continue",
          "title": "You’re removing your recovery phrase"
        },
        "view": {
          "error": "Wrong password, try again",
          "warning": {
            "message1": "Anyone who knows your recovery phrase can access your wallet and funds",
            "message2": "View this in private",
            "message3": "Do not share this with anyone",
            "message4": "Never enter it to any websites or apps",
            "title": "Before you continue"
          }
        },
        "warning": {
          "screenshot": {
            "message": "Anyone who gains access to your photos can access your wallet. We recommend that you write down your words instead.",
            "title": "Screenshots aren’t secure"
          },
          "view": {
            "message": "Anyone who knows your recovery phrase can access your wallet and funds.",
            "title": "View this in a private place"
          }
        }
      }
    },
    "settings": {
      "action": {
        "feedback": "Send feedback",
        "help": "Get help",
        "lock": "Lock wallet",
        "privacy": "Privacy policy",
        "terms": "Terms of service"
      },
      "footer": "Made with love, \nUniswap Team 🦄",
      "screen": {
        "appearance": {
          "title": "Appearance"
        }
      },
      "section": {
        "about": "About",
        "preferences": "Preferences",
        "security": "Security",
        "support": "Support",
        "wallet": {
          "action": {
            "hide": "Hide wallets",
            "showAll_one": "Show one wallet",
            "showAll_other": "Show all {{count}} wallets"
          },
          "button": {
            "viewAll": "View all",
            "viewLess": "View less"
          },
          "title": "Wallet settings"
        }
      },
      "setting": {
        "appearance": {
          "option": {
            "dark": {
              "subtitle": "Always use dark mode",
              "title": "Dark mode"
            },
            "device": {
              "subtitle": "Default to your device’s appearance",
              "title": "Device settings"
            },
            "light": {
              "subtitle": "Always use light mode",
              "title": "Light mode"
            }
          },
          "title": "Appearance"
        },
        "backup": {
          "create": {
            "description": "Setting a password will encrypt your recovery phrase backup, adding an extra level of protection if your {{cloudProviderName}} account is ever compromised.",
            "title": "Back up to {{cloudProviderName}}"
          },
          "delete": {
            "confirm": {
              "message": "Because these wallets share a recovery phrase, it will also delete the backups for these wallets below",
              "title": "Are you sure?"
            },
            "warning": "If you delete your {{cloudProviderName}} backup, you’ll only be able to recover your wallet with a manual backup of your recovery phrase. Uniswap Labs can’t recover your assets if you lose your recovery phrase."
          },
          "error": {
            "message": {
              "full": "Unable to backup recovery phrase to {{cloudProviderName}}. Please ensure you have {{cloudProviderName}} enabled with available storage space and try again.",
              "short": "Unable to delete backup"
            },
            "title": "{{cloudProviderName}} error"
          },
          "modal": {
            "description": "You haven’t backed up your recovery phrase to {{cloudProviderName}} yet. By doing so, you can recover your wallet just by being logged into {{cloudProviderName}} on any device.",
            "title": "Back up recovery phrase to {{cloudProviderName}}?"
          },
          "password": {
            "disclaimer": "Uniswap Labs does not store your password and can’t recover it, so it’s crucial you remember it.",
            "error": {
              "mismatch": "Passwords do not match",
              "weak": "Weak password"
            },
            "medium": "This is a medium password",
            "placeholder": {
              "confirm": "Confirm password",
              "create": "Create password"
            },
            "strong": "This is a strong password",
            "weak": "This is a weak password"
          },
          "recoveryPhrase": {
            "label": "Recovery phrase"
          },
          "selected": "{{cloudProviderName}} backup",
          "status": {
            "action": {
              "delete": "Delete backup"
            },
            "complete": "Backed up to {{cloudProviderName}}",
            "description": "By having your recovery phrase backed up to {{cloudProviderName}}, you can recover your wallet just by being logged into your {{cloudProviderName}} account on any device.",
            "inProgress": "Backing up to {{cloudProviderName}}...",
            "recoveryPhrase": {
              "backed": "Backed up"
            },
            "title": "{{cloudProviderName}} backup"
          }
        },
        "biometrics": {
          "appAccess": {
            "subtitle": {
              "android": "Require biometrics to open app",
              "ios": "Require {{biometricsMethod}} to open app"
            },
            "title": "App access"
          },
          "auth": "Please authenticate",
          "off": {
            "message": {
              "android": "Biometrics is currently turned off for Uniswap Wallet—you can turn it on in your system settings.",
              "ios": "{{biometricsMethod}} is currently turned off for Uniswap Wallet—you can turn it on in your system settings."
            },
            "title": {
              "android": "Biometrics is turned off",
              "ios": "{{biometricsMethod}} is turned off"
            }
          },
          "title": "Biometrics",
          "transactions": {
            "subtitle": {
              "android": "Require biometrics to transact",
              "ios": "Require {{biometricsMethod}} to transact"
            },
            "title": "Transactions"
          },
          "unavailable": {
            "message": {
              "android": "Biometrics is not setup on your device. To use biometrics, set it up first in Settings.",
              "ios": "{{biometricsMethod}} is not setup on your device. To use {{biometricsMethod}}, set it up first in Settings."
            },
            "title": {
              "android": "Biometrics is not setup",
              "ios": "{{biometricsMethod}} is not setup"
            }
          },
          "warning": {
            "message": {
              "android": "If you don’t turn on {{biometricsMethod}}, anyone who gains access to your device can open Uniswap Wallet and make transactions.",
              "ios": "If you don’t turn on biometrics, anyone who gains access to your device can open Uniswap Wallet and make transactions."
            },
            "title": "Are you sure?"
          }
        },
        "currency": {
          "title": "Local currency"
        },
        "helpCenter": {
          "title": "Help center"
        },
        "language": {
          "button": {
            "navigate": "Go to settings"
          },
          "description": "Uniswap defaults to your device‘s language settings. To change your preferred language, go to “Uniswap” in your device settings and tap on “Language”",
          "title": "Language"
        },
        "password": {
          "title": "Change password"
        },
        "privacy": {
          "analytics": {
            "description": "We use anonymous usage data to enhance your experience across Uniswap Labs products. When disabled, we only track errors and essential usage.",
            "title": "Allow analytics"
          },
          "title": "Privacy"
        },
        "recoveryPhrase": {
          "remove": "Remove recovery phrase",
          "title": "Recovery phrase",
          "view": "View recovery phrase"
        },
        "smallBalances": {
          "title": "Hide small balances"
        },
        "unknownTokens": {
          "title": "Hide unknown tokens"
        },
        "wallet": {
          "action": {
            "editLabel": "Edit label",
            "editProfile": "Edit profile",
            "remove": "Remove wallet"
          },
          "connections": {
            "title": "Manage connections"
          },
          "editLabel": {
            "description": "Labels are not public. They are stored locally and only visible to you.",
            "disclaimer": "This nickname is only visible to you.",
            "save": "Save changes",
            "title": "Edit nickname"
          },
          "label": "Nickname",
          "notifications": {
            "title": "Notifications"
          },
          "preferences": {
            "title": "Wallet preferences"
          }
        }
      },
      "title": "Settings",
      "version": "Version {{appVersion}}"
    },
    "swap": {
      "button": {
        "max": "Max",
        "swap": "Swap",
        "unwrap": "Unwrap",
        "view": "View transaction",
        "wrap": "Wrap"
      },
      "details": {
        "action": {
          "less": "Show less",
          "more": "Show more"
        },
        "feeOnTransfer": "{{tokenSymbol}} fee",
        "newQuote": {
          "input": "New input",
          "output": "New output"
        },
        "rate": "Rate",
        "slippage": "Max slippage",
        "uniswapFee": "Fee"
      },
      "form": {
        "balance": "Balance",
        "header": "Swap",
        "slippage": "{{slippageTolerancePercent}} slippage",
        "warning": {
          "restore": "Restore your wallet to swap"
        }
      },
      "header": {
        "viewOnly": "View-only"
      },
      "hold": {
        "swap": "Hold to swap",
        "tip": "Tip: Hold to instant swap",
        "unwrap": "Hold to unwrap",
        "wrap": "Hold to wrap"
      },
      "request": {
        "details": {
          "header": "You’re swapping"
        },
        "title": {
          "full": "Swap {{inputCurrencySymbol}} → {{outputCurrencySymbol}}",
          "short": "Swap Tokens"
        }
      },
      "review": {
        "summary": "You’re swapping"
      },
      "settings": {
        "protection": {
          "description": "With swap protection on, your Ethereum transactions will be protected from sandwich attacks, with reduced chances of failure.",
          "subtitle": {
            "supported": "{{chainName}} Network",
            "unavailable": "Not available on {{chainName}}"
          },
          "title": "Swap Protection"
        },
        "slippage": {
          "control": {
            "auto": "Auto",
            "title": "Max slippage"
          },
          "description": "Your transaction will revert if the price changes more than the slippage percentage.",
          "input": {
            "message": "If the price slips any further, your transaction will revert. Below is the minimum amount you are guaranteed to receive.",
            "receive": {
              "formatted": "<text>Receive at least </text><highlight>{{amount}} {{tokenSymbol}}</highlight>",
              "unformatted": "Receive at least {{amount}} {{tokenSymbol}}"
            }
          },
          "output": {
            "message": "If the price slips any further, your transaction will revert. Below is the maximum amount you would need to spend.",
            "spend": {
              "formatted": "<text>Spend at most </text><highlight>{{amount}} {{tokenSymbol}}</highlight>",
              "unformatted": "Spend at most {{amount}} {{tokenSymbol}}"
            }
          },
          "warning": {
            "max": "Enter a value less than {{maxSlippageTolerance}}",
            "message": "Slippage may be higher than necessary",
            "min": "Enter a value larger than 0"
          }
        },
        "title": "Swap Settings"
      },
      "slippage": {
        "settings": {
          "title": "Slippage Settings"
        }
      },
      "warning": {
        "expectedFailure": "This transaction is expected to fail",
        "feeOnTransfer": {
          "message": "Some tokens take a fee when they are bought or sold, which is set by the token issuer. Uniswap does not receive any share of these fees.",
          "title": "Why is there an additional fee?"
        },
        "insufficientBalance": {
          "button": "Not enough {{currencySymbol}}",
          "title": "You don’t have enough {{currencySymbol}}"
        },
        "insufficientGas": {
          "button": "Not enough {{currencySymbol}}",
          "cta": {
            "button": "Buy {{currencySymbol}}",
            "message": "You need more <highlight>{{currencySymbol}}</highlight> to cover the network cost for this transaction."
          },
          "title": "You don’t have enough {{currencySymbol}} to cover the network cost"
        },
        "lowLiquidity": {
          "message": "There isn’t currently enough liquidity available between these tokens to perform a swap. Please try again later or select another token.",
          "title": "Not enough liquidity"
        },
        "networkFee": {
          "message": "This is the cost to process your transaction on the blockchain. Uniswap does not receive any share of these fees."
        },
        "offline": {
          "message": "You may have lost internet connection or the network may be down. Please check your internet connection and try again.",
          "title": "You’re offline"
        },
        "priceImpact": {
          "message": "Due to the amount of {{outputCurrencySymbol}} liquidity currently available, the more {{inputCurrencySymbol}} you try to swap, the less {{outputCurrencySymbol}} you will receive.",
          "title": "High price impact ({{priceImpactValue}})"
        },
        "rateLimit": {
          "message": "Please try again in a few minutes.",
          "title": "Rate limit exceeded"
        },
        "router": {
          "message": "You may have lost connection or the network may be down. If the problem persists, please try again later.",
          "title": "This trade cannot be completed right now"
        },
        "uniswapFee": {
          "message": {
            "default": "Fees are applied on a few select tokens to ensure the best experience with Uniswap. There is no fee associated with this swap.",
            "included": "Fees are applied on a few select tokens to ensure the best experience with Uniswap, and have already been factored into this quote."
          },
          "title": "Swap fee"
        },
        "viewOnly": {
          "message": "You need to import this wallet via recovery phrase to swap tokens."
        }
      }
    },
    "token": {
      "balances": {
        "main": "Your balance",
        "other": "Balances on other networks",
        "viewOnly": "{{ownerAddress}}’s balance"
      },
      "error": {
        "unknown": "Unknown token"
      },
      "links": {
        "contract": "Contract",
        "title": "Links",
        "twitter": "Twitter",
        "website": "Website"
      },
      "priceExplorer": {
        "error": {
          "description": "Something went wrong.",
          "title": "Couldn’t load price chart"
        },
        "timeRangeLabel": {
          "day": "1D",
          "hour": "1H",
          "month": "1M",
          "week": "1W",
          "year": "1Y"
        }
      },
      "safetyLevel": {
        "blocked": {
          "header": "Not available",
          "message": "You can’t trade this token using the Uniswap Wallet."
        },
        "medium": {
          "header": "Caution",
          "message": "This token isn’t traded on leading U.S. centralized exchanges. Always conduct your own research before trading."
        },
        "strong": {
          "header": "Warning",
          "message": "This token isn’t traded on leading U.S. centralized exchanges or frequently swapped on Oton. Always conduct your own research before trading."
        }
      },
      "selector": {
        "search": {
          "error": "Couldn’t load search results"
        }
      },
      "stats": {
        "fullyDilutedValuation": "Fully Diluted Valuation",
        "marketCap": "Market Cap",
        "priceHighYear": "52W High",
        "priceLowYear": "52W Low",
        "section": {
          "about": "About {{token}}"
        },
        "title": "Stats",
        "translation": {
          "original": "Show original",
          "translate": "Translate to {{language}}"
        },
        "volume": "24h Volume"
      }
    },
    "tokens": {
      "action": {
        "hide": "Hide Token",
        "unhide": "Unhide Token"
      },
      "hidden": {
        "label": "Hidden ({{numHidden}})"
      },
      "nfts": {
        "collection": {
          "error": {
            "load": {
              "title": "Couldn’t load NFT collection"
            }
          },
          "label": {
            "items": "Items",
            "owners": "Owners",
            "priceFloor": "Floor",
            "swapVolume": "Volume"
          }
        },
        "details": {
          "error": {
            "load": {
              "title": "Couldn’t load NFT details"
            }
          },
          "owner": "Owned by",
          "price": "Current price",
          "recentPrice": "Last sale price",
          "traits": "Traits"
        },
        "empty": {
          "description": "No NFTs found"
        },
        "error": {
          "unavailable": "Content not available"
        },
        "hidden": {
          "action": {
            "hide": "Hide NFT",
            "unhide": "Unhide NFT"
          },
          "label": "Hidden ({{numHidden}})"
        },
        "link": {
          "collection": "Collection website"
        },
        "list": {
          "error": {
            "load": {
              "title": "Couldn’t load NFTs"
            }
          },
          "none": {
            "button": "Receive NFTs",
            "description": {
              "default": "Transfer NFTs from another wallet to get started.",
              "external": "When this wallet buys or receives NFTs, they’ll appear here."
            },
            "title": "No NFTs yet"
          }
        }
      },
      "selector": {
        "button": {
          "choose": "Choose token",
          "clear": "Clear all"
        },
        "empty": {
          "buy": {
            "message": "Buy crypto with a card or bank to send tokens.",
            "title": "Buy crypto"
          },
          "receive": {
            "message": "Transfer tokens from a centralized exchange or another wallet to send tokens.",
            "title": "Receive tokens"
          },
          "title": "No tokens yet"
        },
        "error": {
          "load": "Couldn’t load tokens"
        },
        "search": {
          "empty": "No results found for <highlight>{{searchText}}</highlight>",
          "placeholder": "Search tokens"
        },
        "section": {
          "favorite": "Favorites",
          "popular": "Popular tokens",
          "recent": "Recent searches",
          "search": "Search results",
          "suggested": "Suggested",
          "yours": "Your tokens"
        }
      }
    },
    "transaction": {
      "action": {
        "cancel": {
          "button": "Cancel transaction",
          "description": "If you cancel this transaction before it’s processed by the network, you’ll pay a new network fee instead of the original one.",
          "title": "Cancel this transaction?"
        },
        "copy": "Copy transaction ID",
        "copyMoonPay": "Copy MoonPay transaction ID",
        "view": "View {{tokenSymbol}}",
        "viewEtherscan": "View on {{blockExplorerName}}",
        "viewMoonPay": "View on MoonPay"
      },
      "amount": {
        "unlimited": "Unlimited"
      },
      "currency": {
        "unknown": "unknown token"
      },
      "date": "Submitted on {{date}}",
      "network": {
        "all": "All networks"
      },
      "networkCost": {
        "label": "Network cost"
      },
      "notification": {
        "error": {
          "cancel": "Unable to cancel transaction",
          "replace": "Unable to replace transaction"
        }
      },
      "priceImpact": {
        "label": "Price impact"
      },
      "status": {
        "approve": {
          "canceled": "Canceled approve",
          "canceling": "Canceling approve",
          "failed": "Failed to approve",
          "pending": "Approving",
          "success": "Approved",
          "successDapp": "Approved on {{externalDappName}}"
        },
        "buy": {
          "canceled": "Canceled buy",
          "canceling": "Canceling buy",
          "failed": "Failed to buy",
          "pending": "Buying",
          "success": "Bought",
          "successDapp": "Bought on {{externalDappName}}"
        },
        "confirm": {
          "canceled": "Canceled confirm",
          "canceling": "Canceling confirm",
          "failed": "Failed to confirm",
          "pending": "Transaction in progress",
          "success": "Transaction confirmed",
          "successDapp": "Transaction confirmed on {{externalDappName}}"
        },
        "mint": {
          "canceled": "Canceled mint",
          "canceling": "Canceling mint",
          "failed": "Failed to mint",
          "pending": "Minting",
          "success": "Minted",
          "successDapp": "Minted on {{externalDappName}}"
        },
        "purchase": {
          "canceled": "Canceled purchase",
          "canceling": "Canceling purchase",
          "failed": "Failed to purchase",
          "pending": "Purchasing",
          "success": "Purchased",
          "successDapp": "Purchased on {{externalDappName}}"
        },
        "receive": {
          "canceled": "Canceled receive",
          "canceling": "Canceling receive",
          "failed": "Failed to receive",
          "pending": "Receiving",
          "success": "Received",
          "successDapp": "Received on {{externalDappName}}"
        },
        "revoke": {
          "canceled": "Canceled revoke",
          "canceling": "Canceling revoke",
          "failed": "Failed to revoke",
          "pending": "Revoking",
          "success": "Revoked",
          "successDapp": "Revoked on {{externalDappName}}"
        },
        "sell": {
          "canceled": "Canceled sell",
          "canceling": "Canceling sell",
          "failed": "Failed to sell",
          "pending": "Selling",
          "success": "Sold",
          "successDapp": "Sold on {{externalDappName}}"
        },
        "send": {
          "canceled": "Canceled send",
          "canceling": "Canceling send",
          "failed": "Failed to send",
          "pending": "Sending",
          "success": "Sent",
          "successDapp": "Sent on {{externalDappName}}"
        },
        "swap": {
          "canceled": "Canceled swap",
          "canceling": "Canceling swap",
          "failed": "Failed to swap",
          "pending": "Swapping",
          "success": "Swapped",
          "successDapp": "Swapped on {{externalDappName}}"
        },
        "unwrap": {
          "canceled": "Canceled unwrap",
          "canceling": "Canceling unwrap",
          "failed": "Failed to unwrap",
          "pending": "Unwrapping",
          "success": "Unwrapped",
          "successDapp": "Unwrapped on {{externalDappName}}"
        },
        "wrap": {
          "canceled": "Canceled wrap",
          "canceling": "Canceling wrap",
          "failed": "Failed to wrap",
          "pending": "Wrapping",
          "success": "Wrapped",
          "successDapp": "Wrapped on {{externalDappName}}"
        }
      },
      "summary": {
        "received": "{{tokenAmountWithSymbol}} to {{recipientAddress}}",
        "sent": "{{tokenAmountWithSymbol}} from {{senderAddress}}"
      },
      "watcher": {
        "error": {
          "cancel": "Unable to cancel transaction",
          "status": "Error while checking transaction status"
        }
      }
    },
    "unicons": {
      "banner": {
        "button": "Got it",
        "subtitle": "We gave your wallet’s unique Unicon a makeover. Check out the rest of your accounts to see your upgraded icons.",
        "title": "Your Unicon got a new look"
      }
    },
    "unitags": {
      "banner": {
        "button": {
          "claim": "Claim now"
        },
        "subtitle": "Build a personalized web3 profile and easily share your address with friends.",
        "title": {
          "compact": "<highlight>Claim your {{unitagDomain}} username</highlight> and build out your customizable profile.",
          "full": "Claim your {{unitagDomain}} username"
        }
      },
      "choosePhoto": {
        "option": {
          "cameraRoll": "Choose from camera roll",
          "nft": "Choose an NFT",
          "remove": "Remove profile picture"
        }
      },
      "claim": {
        "confirmation": {
          "customize": "Customize profile",
          "description": "{{unitagAddress}} is ready to send and receive crypto. Continue to build out your wallet by customizing your web3 profile.",
          "success": {
            "long": "You got it!",
            "short": "got it!"
          }
        },
        "error": {
          "addressLimit": "You already have made the maximum number of changes to your username for this address",
          "appCheck": "Could not claim username. Please try again tomorrow.",
          "avatar": "Could not set avatar. Try again later.",
          "default": "Could not claim username. Try again later.",
          "deviceLimit": "You have hit the maximum number of usernames that can be active for this device",
          "ens": "To claim this username you must own the {{username}}.eth ENS",
          "ensMismatch": "This username is not currently available.",
          "general": "Unable to claim username",
          "unavailable": "This username is not available",
          "unknown": "Unknown error"
        },
        "username": {
          "default": "yourname"
        }
      },
      "delete": {
        "confirm": {
          "subtitle": "You’re about to delete your username and customizable profile details. You will not be able to reclaim it.",
          "title": "Are you sure?"
        }
      },
      "editProfile": {
        "placeholder": "username"
      },
      "editUsername": {
        "button": {
          "confirm": "Save changes"
        },
        "confirm": {
          "subtitle": "You’re about to change your username. Once you change it, you can never claim it again.",
          "title": "Are you sure?"
        },
        "title": "Edit username",
        "warning": {
          "default": "Once you change your username, you can never claim it again. You can only change it 2 times.",
          "max": "You’ve reached the maximum number of 2 usernames changes."
        }
      },
      "intro": {
        "features": {
          "ens": "Powered by ENS subdomains",
          "free": "Free to claim",
          "profile": "Customizable profiles"
        },
        "subtitle": "Say goodbye to 0x addresses. Usernames are readable names that make it easier to send and receive crypto.",
        "title": "Introducing usernames"
      },
      "notification": {
        "delete": {
          "error": "Could not delete username. Try again later.",
          "title": "Username deleted"
        },
        "profile": {
          "error": "Could not update profile. Try again later.",
          "title": "Profile updated"
        },
        "username": {
          "error": "Could not change username. Try again later.",
          "title": "Username changed"
        }
      },
      "onboarding": {
        "claim": {
          "subtitle": "This is your unique name that anyone can send crypto to.",
          "title": {
            "choose": "Choose your username",
            "claim": "Claim your username"
          }
        },
        "claimPeriod": {
          "description": "For a limited time, the username {{username}} is reserved. Import the wallet that owns {{username}}.eth ENS to claim this username or try again after the claim period.",
          "link": "Learn more about our <highlight>claim period</highlight>.",
          "title": "ENS claim period"
        },
        "info": {
          "description": "Usernames transform complex 0x addresses into readable names. By claiming a {{unitagDomain}} username, you can easily send and receive crypto and build out a public web3 profile.",
          "title": "A simplified address"
        },
        "profile": {
          "subtitle": "Upload your own or stick with your unique Unicon. You can always change this later.",
          "title": "Choose a profile photo"
        }
      },
      "profile": {
        "action": {
          "delete": "Delete username",
          "edit": "Edit username"
        },
        "bio": {
          "label": "Bio",
          "placeholder": "Type a bio for your profile"
        },
        "links": {
          "twitter": "Twitter"
        }
      },
      "username": {
        "error": {
          "chars": "Usernames can only contain letters and numbers",
          "max": "Usernames cannot be more than {{number}} characters",
          "min": "Usernames must be at least {{number}} characters",
          "uppercase": "Usernames can only contain lowercase letters and numbers"
        }
      }
    },
    "walletConnect": {
      "dapps": {
        "connection": "<highlight>Connected to </highlight>{{dappNameOrUrl}}",
        "empty": {
          "description": "Connect to an app by scanning a code via WalletConnect"
        },
        "manage": {
          "empty": {
            "title": "No apps connected"
          },
          "title": "Manage connections"
        }
      },
      "error": {
        "connection": {
          "message": "Uniswap Wallet currently supports {{chainNames}}. Please only use \"{{dappName}}\" on these chains",
          "title": "Connection Error"
        },
        "general": {
          "message": "There was an issue with WalletConnect. Please try again",
          "title": "WalletConnect Error"
        },
        "scantastic": {
          "message": "There was an issue with your QR code. Please try again",
          "title": "Invalid QR Code"
        },
        "unsupported": {
          "message": "Make sure that you’re scanning a valid WalletConnect or Ethereum address QR code before trying again.",
          "title": "Invalid QR Code"
        },
        "unsupportedV1": {
          "message": "WalletConnect v1 is no longer supported. The application you’re trying to connect to needs to upgrade to WalletConnect v2.",
          "title": "Invalid QR Code"
        },
        "uwu": {
          "scan": "There was an issue scanning this QR code.",
          "title": "UwU Link error",
          "unsupported": "This QR code is not supported."
        }
      },
      "pending": {
        "button": {
          "connect": "Connect"
        },
        "switchAccount": "Switch Account",
        "switchNetwork": "Switch Network",
        "title": "{{dappName}} wants to connect to your wallet"
      },
      "permissions": {
        "networks": "Networks",
        "option": {
          "transferAssets": "Transfer your assets without consent",
          "viewTokenBalances": "View your token balances",
          "viewWalletAddress": "View your wallet address"
        },
        "title": "App permissions"
      },
      "request": {
        "button": {
          "sign": "Sign"
        },
        "details": {
          "label": {
            "function": "Function: ",
            "recipient": "To: ",
            "sending": "Sending: "
          }
        },
        "error": {
          "insufficientFunds": "You don’t have enough {{currencySymbol}} to complete this transaction.",
          "network": "Internet or network connection error"
        },
        "label": {
          "network": "Network"
        },
        "warning": {
          "general": {
            "message": "Be careful: this message may transfer assets",
            "transaction": "Be careful: this transaction may transfer assets"
          },
          "message": "In order to sign messages or transactions, you’ll need to import the wallet’s recovery phrase.",
          "title": "This wallet is in view only mode"
        }
      }
    }
  }
}

export default Resources;
