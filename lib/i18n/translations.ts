import { Locale } from './context'

export type TranslationKeys = {
  // Common
  'common.loading': string
  'common.error': string
  'common.save': string
  'common.cancel': string
  'common.delete': string
  'common.edit': string
  'common.add': string
  'common.added': string
  'common.search': string
  'common.filter': string
  'common.all': string
  'common.retry': string
  'common.continue': string
  'common.back': string
  'common.of': string
  'common.next': string
  'common.previous': string
  'common.page': string

  // Basket
  'basket.addedToBasket': string

  // Navigation
  'nav.home': string
  'nav.products': string
  'nav.science': string
  'nav.reviews': string
  'nav.consulting': string
  'nav.history': string
  'nav.admin': string
  'nav.tryScan': string

  // Home page
  'home.badge': string
  'home.hero.title1': string
  'home.hero.title2': string
  'home.hero.subtitle': string
  'home.hero.cta': string
  'home.hero.science': string
  'home.stats.scans': string
  'home.stats.rating': string
  'home.stats.accuracy': string
  'home.floating.hydration': string
  'home.floating.poreSize': string
  'home.floating.poreValue': string
  'home.floating.skinScore': string
  'home.science.tag': string
  'home.science.title': string
  'home.science.subtitle': string
  'home.science.preview': string
  'home.science.texture': string
  'home.science.textureDesc': string
  'home.science.hydration': string
  'home.science.hydrationDesc': string
  'home.science.pore': string
  'home.science.poreDesc': string
  'home.science.oil': string
  'home.science.oilDesc': string
  'home.why.title': string
  'home.why.subtitle': string
  'home.why.speed.title': string
  'home.why.speed.desc': string
  'home.why.privacy.title': string
  'home.why.privacy.desc': string
  'home.why.derm.title': string
  'home.why.derm.desc': string
  'home.why.allSkin.title': string
  'home.why.allSkin.desc': string
  'home.reviews.title': string
  'home.reviews.subtitle': string
  'home.reviews.skin.combination': string
  'home.reviews.skin.sensitive': string
  'home.reviews.skin.dry': string
  'home.cta.title': string
  'home.cta.subtitle': string
  'home.cta.button': string
  'home.finalCta.title': string
  'home.finalCta.subtitle': string
  'home.footer.privacy': string
  'home.footer.terms': string
  'home.footer.contact': string

  // Welcome screen
  'welcome.tagline': string
  'welcome.title': string
  'welcome.subtitle': string
  'welcome.feature.scan': string
  'welcome.feature.scanDesc': string
  'welcome.feature.survey': string
  'welcome.feature.surveyDesc': string
  'welcome.feature.results': string
  'welcome.feature.resultsDesc': string
  'welcome.cta': string
  'welcome.privacy': string

  // Camera
  'camera.title': string
  'camera.guide': string
  'camera.error': string
  'camera.retry': string

  // Scanning
  'scanning.title': string
  'scanning.subtitle': string
  'scanning.step.texture': string
  'scanning.step.pores': string
  'scanning.step.hydration': string
  'scanning.step.blemishes': string
  'scanning.step.tone': string
  'scanning.step.processing': string
  'scanning.stat.texture': string
  'scanning.stat.hydration': string
  'scanning.stat.tone': string
  'scanning.stat.analyzed': string
  'scanning.stat.scanning': string

  // Survey
  'survey.multiSelectHint': string
  'survey.seeResults': string
  'survey.q1': string
  'survey.q1.veryOily': string
  'survey.q1.veryOilyDesc': string
  'survey.q1.oily': string
  'survey.q1.oilyDesc': string
  'survey.q1.balanced': string
  'survey.q1.balancedDesc': string
  'survey.q1.dry': string
  'survey.q1.dryDesc': string
  'survey.q1.veryDry': string
  'survey.q1.veryDryDesc': string
  'survey.q2': string
  'survey.q2.verySensitive': string
  'survey.q2.verySensitiveDesc': string
  'survey.q2.sensitive': string
  'survey.q2.sensitiveDesc': string
  'survey.q2.notSensitive': string
  'survey.q2.notSensitiveDesc': string
  'survey.q3': string
  'survey.q3.veryDry': string
  'survey.q3.veryDryDesc': string
  'survey.q3.dry': string
  'survey.q3.dryDesc': string
  'survey.q3.normal': string
  'survey.q3.normalDesc': string
  'survey.q3.oily': string
  'survey.q3.oilyDesc': string
  'survey.q4': string
  'survey.q4.acne': string
  'survey.q4.aging': string
  'survey.q4.darkSpots': string
  'survey.q4.redness': string
  'survey.q4.pores': string
  'survey.q4.dullness': string
  'survey.q5': string
  'survey.q5.minimal': string
  'survey.q5.minimalDesc': string
  'survey.q5.basic': string
  'survey.q5.basicDesc': string
  'survey.q5.intermediate': string
  'survey.q5.intermediateDesc': string
  'survey.q5.advanced': string
  'survey.q5.advancedDesc': string

  // Results
  'results.title': string
  'results.skinType': string
  'results.keyFindings': string
  'results.tips': string
  'results.products': string
  'results.seeAll': string
  'results.routine.title': string
  'results.routine.morning': string
  'results.routine.evening': string
  'results.restart': string
  'results.addToRoutine': string
  'results.skinType.oily': string
  'results.skinType.dry': string
  'results.skinType.combination': string
  'results.skinType.sensitive': string
  'results.skinType.normal': string
  'results.tip.oily': string
  'results.tip.dry': string
  'results.tip.combination': string
  'results.tip.sensitive': string
  'results.tip.normal': string
  'results.skinScore': string
  'results.metricsTitle': string
  'results.metric.hydration': string
  'results.metric.oiliness': string
  'results.metric.texture': string
  'results.metric.clarity': string
  'results.metric.elasticity': string
  'results.metricStatus.excellent': string
  'results.metricStatus.good': string
  'results.metricStatus.fair': string
  'results.metricStatus.needsAttention': string
  // History
  'history.title': string
  'history.emptyTitle': string
  'history.emptySubtitle': string
  'history.notFoundTitle': string
  'history.notFoundSubtitle': string
  'history.viewHistory': string
  'history.open': string

  // Products page
  'products.title': string
  'products.searchPlaceholder': string
  'products.allBrands': string
  'products.allTypes': string
  'products.noProducts': string
  'products.noProductsFiltered': string
  'products.clearFilters': string
  'products.filters': string
  'products.clearAll': string
  'products.searchLabel': string
  'products.brandLabel': string
  'products.typeLabel': string
  'products.product': string
  'products.products': string
  'products.addToRoutine': string
  'products.usageTip': string
  'products.viewDetails': string
  // Product detail page
  'product.back': string
  'product.usageTip': string
  'product.description': string
  'product.addToRoutine': string
  'product.notFound': string

  // Admin page
  'admin.title': string
  'admin.subtitle': string
  'admin.addProduct': string
  'admin.editProduct': string
  'admin.deleteConfirm': string
  'admin.totalProducts': string
  'admin.totalBrands': string
  'admin.avgPrice': string
  'admin.view.list': string
  'admin.view.cards': string
  'admin.tab.products': string
  'admin.tab.reviews': string
  'admin.totalReviews': string
  'admin.averageRating': string
  'admin.reviews.author': string
  'admin.reviews.rating': string
  'admin.reviews.comment': string
  'admin.reviews.date': string
  'admin.noProducts': string
  'admin.addProductHint': string
  'admin.noReviews': string
  'admin.reviews.aiAnalyze': string
  'admin.reviews.aiTitle': string
  'admin.reviews.period': string
  'admin.reviews.period.1d': string
  'admin.reviews.period.1w': string
  'admin.reviews.period.1m': string
  'admin.reviews.period.3m': string
  'admin.reviews.period.6m': string
  'admin.reviews.generate': string
  'admin.reviews.analyzing': string
  'admin.reviews.analyzedCount': string
  'admin.reviews.actions': string
  'admin.reviews.remove': string
  'admin.reviews.deleteTitle': string
  'admin.reviews.deleteConfirm': string

  // Review form
  'review.title': string
  'review.name': string
  'review.namePlaceholder': string
  'review.rating': string
  'review.comment': string
  'review.commentPlaceholder': string
  'review.submit': string
  'review.submitting': string
  'review.thankYou': string
  'review.submitted': string
}

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.added': 'Added',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.retry': 'Retry',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.of': 'of',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.page': 'Page',

    'basket.addedToBasket': 'Added to basket',

    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.science': 'Science',
    'nav.reviews': 'Reviews',
    'nav.consulting': 'Consulting',
    'nav.history': 'History',
    'nav.admin': 'Admin',
    'nav.tryScan': 'Try Scan',

    'home.badge': '2-Minute AI Skin Analysis',
    'home.hero.title1': 'Your Skin,',
    'home.hero.title2': 'Decoded.',
    'home.hero.subtitle': 'Stop guessing. MizuCaire uses computer vision to map your skin\'s unique profile and build a routine that actually works.',
    'home.hero.cta': 'Analyze My Skin',
    'home.hero.science': 'Free consultation',
    'home.stats.scans': 'Scans completed',
    'home.stats.rating': 'User rating',
    'home.stats.accuracy': 'Accuracy rate',
    'home.floating.hydration': 'Hydration',
    'home.floating.poreSize': 'Pore Size',
    'home.floating.poreValue': 'Small',
    'home.floating.skinScore': 'Skin Score',
    'home.science.tag': 'The Science',
    'home.science.title': 'We Analyze What Your Eyes Can\'t See',
    'home.science.subtitle': 'Our AI examines over 14 skin markers across multiple dimensions — from surface texture and pore density to hydration patterns and melanin distribution — to build a complete picture of your skin\'s health.',
    'home.science.preview': 'Live Analysis Preview',
    'home.science.texture': 'Texture Mapping',
    'home.science.textureDesc': 'Surface roughness analysis',
    'home.science.hydration': 'Hydration Index',
    'home.science.hydrationDesc': 'Moisture level detection',
    'home.science.pore': 'Pore Analysis',
    'home.science.poreDesc': 'Size & density mapping',
    'home.science.oil': 'Oil Balance',
    'home.science.oilDesc': 'Sebum production levels',
    'home.why.title': 'Why People Love MizuCaire',
    'home.why.subtitle': 'Built for real people who want real results — not generic advice.',
    'home.why.speed.title': '2 Minutes',
    'home.why.speed.desc': 'From selfie to a full personalized routine. No lengthy questionnaires.',
    'home.why.privacy.title': '100% Private',
    'home.why.privacy.desc': 'Your photos never leave your device. Zero data stored on our servers.',
    'home.why.derm.title': 'Dermatologist-Level',
    'home.why.derm.desc': 'Recommendations backed by clinical skincare research and real science.',
    'home.why.allSkin.title': 'All Skin Types',
    'home.why.allSkin.desc': 'From oily to sensitive, from teen to mature — we\'ve got you covered.',
    'home.reviews.title': 'Real Results, Real People',
    'home.reviews.subtitle': 'See what our community says about their skin transformation',
    'home.reviews.skin.combination': 'Combination',
    'home.reviews.skin.sensitive': 'Sensitive',
    'home.reviews.skin.dry': 'Dry',
    'home.cta.title': 'Ready to Meet Your Skin?',
    'home.cta.subtitle': 'Join 50,000+ people who discovered their perfect routine.',
    'home.cta.button': 'Start Free Analysis',
    'home.finalCta.title': 'Your perfect skincare routine is 2 minutes away',
    'home.finalCta.subtitle': 'No sign-up required. Take a selfie, answer a few questions, and let our AI do the rest.',
    'home.footer.privacy': 'Privacy Policy',
    'home.footer.terms': 'Terms of Service',
    'home.footer.contact': 'Contact',

    'welcome.tagline': 'AI-Powered Skin Analysis',
    'welcome.title': 'Discover Your Perfect Skincare Routine',
    'welcome.subtitle': 'Take a quick photo and answer a few questions to get personalized skincare recommendations tailored just for you.',
    'welcome.feature.scan': 'Face Scan',
    'welcome.feature.scanDesc': 'Quick AI analysis of your skin',
    'welcome.feature.survey': 'Smart Survey',
    'welcome.feature.surveyDesc': 'Understand your skin concerns',
    'welcome.feature.results': 'Personalized Results',
    'welcome.feature.resultsDesc': 'Get tailored product recommendations',
    'welcome.cta': 'Start Analysis',
    'welcome.privacy': 'Your photos are processed locally and never stored',

    'camera.title': 'Take a Photo',
    'camera.guide': 'Position your face within the oval',
    'camera.error': 'Unable to access camera. Please grant camera permissions.',
    'camera.retry': 'Retry',

    'scanning.title': 'Analyzing Your Skin',
    'scanning.subtitle': 'Please wait while we process your photo',
    'scanning.step.texture': 'Analyzing skin texture...',
    'scanning.step.pores': 'Detecting pore size...',
    'scanning.step.hydration': 'Measuring hydration levels...',
    'scanning.step.blemishes': 'Checking for blemishes...',
    'scanning.step.tone': 'Evaluating skin tone...',
    'scanning.step.processing': 'Processing results...',
    'scanning.stat.texture': 'Texture',
    'scanning.stat.hydration': 'Hydration',
    'scanning.stat.tone': 'Tone',
    'scanning.stat.analyzed': 'Analyzed',
    'scanning.stat.scanning': 'Scanning',

    'survey.multiSelectHint': 'Select all that apply',
    'survey.seeResults': 'See My Results',
    'survey.q1': 'How does your skin feel a few hours after cleansing?',
    'survey.q1.veryOily': 'Very Oily',
    'survey.q1.veryOilyDesc': 'Shiny all over',
    'survey.q1.oily': 'Somewhat Oily',
    'survey.q1.oilyDesc': 'Oily in T-zone',
    'survey.q1.balanced': 'Balanced',
    'survey.q1.balancedDesc': 'Neither oily nor dry',
    'survey.q1.dry': 'A Bit Dry',
    'survey.q1.dryDesc': 'Feels tight in some areas',
    'survey.q1.veryDry': 'Very Dry',
    'survey.q1.veryDryDesc': 'Tight and flaky',
    'survey.q2': 'How does your skin react to new products?',
    'survey.q2.verySensitive': 'Very Sensitive',
    'survey.q2.verySensitiveDesc': 'Burns or stings easily',
    'survey.q2.sensitive': 'Somewhat Sensitive',
    'survey.q2.sensitiveDesc': 'Occasional reactions',
    'survey.q2.notSensitive': 'Not Sensitive',
    'survey.q2.notSensitiveDesc': 'Rarely reacts',
    'survey.q3': "How would you describe your skin's hydration?",
    'survey.q3.veryDry': 'Very Dehydrated',
    'survey.q3.veryDryDesc': 'Constantly needs moisture',
    'survey.q3.dry': 'Often Dry',
    'survey.q3.dryDesc': 'Needs regular moisturizing',
    'survey.q3.normal': 'Well Hydrated',
    'survey.q3.normalDesc': 'Moisture balanced',
    'survey.q3.oily': 'Overly Hydrated',
    'survey.q3.oilyDesc': 'Can skip moisturizer',
    'survey.q4': 'What are your main skin concerns?',
    'survey.q4.acne': 'Acne & Breakouts',
    'survey.q4.aging': 'Fine Lines & Wrinkles',
    'survey.q4.darkSpots': 'Dark Spots & Uneven Tone',
    'survey.q4.redness': 'Redness & Irritation',
    'survey.q4.pores': 'Large Pores',
    'survey.q4.dullness': 'Dullness & Lack of Glow',
    'survey.q5': "What's your current skincare routine like?",
    'survey.q5.minimal': 'Minimal',
    'survey.q5.minimalDesc': 'Just cleanser and maybe moisturizer',
    'survey.q5.basic': 'Basic',
    'survey.q5.basicDesc': 'Cleanser, moisturizer, sunscreen',
    'survey.q5.intermediate': 'Intermediate',
    'survey.q5.intermediateDesc': 'Including serums and treatments',
    'survey.q5.advanced': 'Advanced',
    'survey.q5.advancedDesc': 'Multiple products and steps',

    'results.title': 'Your Results',
    'results.skinType': 'Your Skin Type',
    'results.keyFindings': 'Key Findings',
    'results.tips': 'Skincare Tips',
    'results.products': 'Recommended Products',
    'results.seeAll': 'See all',
    'results.routine.title': 'Your Daily Routine',
    'results.routine.morning': 'Morning',
    'results.routine.evening': 'Evening',
    'results.restart': 'Start New Analysis',
    'results.addToRoutine': 'add to basket',
    'results.skinType.oily': 'Oily',
    'results.skinType.dry': 'Dry',
    'results.skinType.combination': 'Combination',
    'results.skinType.sensitive': 'Sensitive',
    'results.skinType.normal': 'Normal',
    'results.tip.oily': 'Focus on oil control and gentle cleansing without stripping your skin.',
    'results.tip.dry': 'Prioritize hydration and moisture-locking ingredients like ceramides.',
    'results.tip.combination': 'Balance is key - use targeted treatments for different zones.',
    'results.tip.sensitive': 'Gentle, fragrance-free products are your best friends.',
    'results.tip.normal': 'Maintain your healthy skin with preventative care.',
    'results.skinScore': 'Skin Score:',
    'results.metricsTitle': 'Skin Analysis Metrics',
    'results.metric.hydration': 'Hydration',
    'results.metric.oiliness': 'Oiliness',
    'results.metric.texture': 'Texture',
    'results.metric.clarity': 'Clarity',
    'results.metric.elasticity': 'Elasticity',
    'results.metricStatus.excellent': 'Excellent',
    'results.metricStatus.good': 'Good',
    'results.metricStatus.fair': 'Fair',
    'results.metricStatus.needsAttention': 'Needs attention',
    'history.title': 'Scan history',
    'history.emptyTitle': 'No saved scans yet.',
    'history.emptySubtitle': 'Complete a face scan to see history here.',
    'history.notFoundTitle': 'Scan not found',
    'history.notFoundSubtitle': 'This scan may have been removed from local history.',
    'history.viewHistory': 'View history',
    'history.open': 'Open',

    'products.title': 'Products',
    'products.searchPlaceholder': 'Search products by name, brand, or description...',
    'products.allBrands': 'All Brands',
    'products.allTypes': 'All Types',
    'products.noProducts': 'No products have been added yet',
    'products.noProductsFiltered': 'Try adjusting your filters or search query',
    'products.clearFilters': 'Clear all filters',
    'products.filters': 'Filters:',
    'products.clearAll': 'Clear all',
    'products.searchLabel': 'Search:',
    'products.brandLabel': 'Brand:',
    'products.typeLabel': 'Type:',
    'products.product': 'product',
    'products.products': 'products',
    'products.addToRoutine': 'add to basket',
    'products.usageTip': 'How to Use',
    'products.viewDetails': 'View Details',
    'product.back': 'Back to Products',
    'product.usageTip': 'How to Use',
    'product.description': 'About This Product',
    'product.addToRoutine': 'add to basket',
    'product.notFound': 'Product not found',

    'admin.title': 'Admin',
    'admin.subtitle': 'Manage your skincare products',
    'admin.addProduct': 'Add Product',
    'admin.editProduct': 'Edit Product',
    'admin.deleteConfirm': 'Are you sure you want to delete "{name}"? This action cannot be undone.',
    'admin.totalProducts': 'Total Products',
    'admin.totalBrands': 'Total Brands',
    'admin.avgPrice': 'Avg. Price',
    'admin.view.list': 'List',
    'admin.view.cards': 'Cards',
    'admin.tab.products': 'Products',
    'admin.tab.reviews': 'Reviews',
    'admin.totalReviews': 'Total Reviews',
    'admin.averageRating': 'Average Rating',
    'admin.reviews.author': 'Author',
    'admin.reviews.rating': 'Rating',
    'admin.reviews.comment': 'Comment',
    'admin.reviews.date': 'Date',
    'admin.noProducts': 'No products yet',
    'admin.addProductHint': 'Click "Add Product" to get started',
    'admin.noReviews': 'No reviews yet',
    'admin.reviews.aiAnalyze': 'AI Analyze',
    'admin.reviews.aiTitle': 'AI Review Summary',
    'admin.reviews.period': 'Period',
    'admin.reviews.period.1d': 'Last 1 day',
    'admin.reviews.period.1w': 'Last 1 week',
    'admin.reviews.period.1m': 'Last 1 month',
    'admin.reviews.period.3m': 'Last 3 months',
    'admin.reviews.period.6m': 'Last 6 months',
    'admin.reviews.generate': 'Generate Summary',
    'admin.reviews.analyzing': 'Analyzing...',
    'admin.reviews.analyzedCount': 'Analyzed {count} reviews',
    'admin.reviews.actions': 'Actions',
    'admin.reviews.remove': 'Remove',
    'admin.reviews.deleteTitle': 'Delete Review',
    'admin.reviews.deleteConfirm': 'Delete review from {name}? This action cannot be undone.',

    'review.title': 'Leave a Review',
    'review.name': 'Your Name',
    'review.namePlaceholder': 'Enter your name',
    'review.rating': 'Rating',
    'review.comment': 'Your Review',
    'review.commentPlaceholder': 'Share your experience with MizuCaire...',
    'review.submit': 'Submit Review',
    'review.submitting': 'Submitting...',
    'review.thankYou': 'Thank You!',
    'review.submitted': 'Your review has been submitted and will appear on our homepage.',
  },

  ru: {
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Изменить',
    'common.add': 'Добавить',
    'common.added': 'Добавлено',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.all': 'Все',
    'common.retry': 'Повторить',
    'common.continue': 'Продолжить',
    'common.back': 'Назад',
    'common.of': 'из',
    'common.next': 'Вперед',
    'common.previous': 'Назад',
    'common.page': 'Страница',

    'basket.addedToBasket': 'Добавлено в корзину',

    'nav.home': 'Главная',
    'nav.products': 'Продукты',
    'nav.science': 'Наука',
    'nav.reviews': 'Отзывы',
    'nav.consulting': 'Консультация',
    'nav.history': 'История',
    'nav.admin': 'Адм��нистратор',
    'nav.tryScan': 'Сканировать',

    'home.badge': 'ИИ-анализ кожи за 2 минуты',
    'home.hero.title1': 'Ваша кожа,',
    'home.hero.title2': 'Расшифрована.',
    'home.hero.subtitle': 'Хватит угадывать. MizuCaire использует компьютерное зрение для создания уникального профиля вашей кожи и подбора подходящего ухода.',
    'home.hero.cta': 'Анализировать кожу',
    'home.hero.science': 'Бесплатная консультация',
    'home.stats.scans': 'Выполнено сканирований',
    'home.stats.rating': 'Рейтинг пользователей',
    'home.stats.accuracy': 'Точность',
    'home.floating.hydration': 'Увлажнение',
    'home.floating.poreSize': 'Размер пор',
    'home.floating.poreValue': 'Маленький',
    'home.floating.skinScore': 'Оценка кожи',
    'home.science.tag': 'Наука',
    'home.science.title': 'Мы анализируем то, что не видит глаз',
    'home.science.subtitle': 'Наш ИИ исследует более 14 показателей кожи — от текстуры поверхности и плотности пор до паттернов увлажнения и распределения меланина — для полной картины здоровья вашей кожи.',
    'home.science.preview': 'Предварительный просмотр анализа',
    'home.science.texture': 'Картирование текстуры',
    'home.science.textureDesc': 'Анализ шероховатости поверхности',
    'home.science.hydration': 'Индекс увлажнения',
    'home.science.hydrationDesc': 'Определение уровня влажности',
    'home.science.pore': 'Анализ пор',
    'home.science.poreDesc': 'Картирование размера и плотности',
    'home.science.oil': 'Баланс жира',
    'home.science.oilDesc': 'Уровень выработки кожного сала',
    'home.why.title': 'Почему люди выбирают MizuCaire',
    'home.why.subtitle': 'Создано для реальных людей, которые хотят реальных результатов.',
    'home.why.speed.title': '2 минуты',
    'home.why.speed.desc': 'От селфи до полного персонального ухода. Без длинных опросников.',
    'home.why.privacy.title': '100% Конфиденциально',
    'home.why.privacy.desc': 'Ваши фото никогда не покидают устройство. Ноль данных на наших серверах.',
    'home.why.derm.title': 'Уровень дерматолога',
    'home.why.derm.desc': 'Рекомендации на основе клинических исследований в области ухода за кожей.',
    'home.why.allSkin.title': 'Все типы кожи',
    'home.why.allSkin.desc': 'От жирной до чувствительной, от молодой до зрелой — мы поможем каждому.',
    'home.reviews.title': 'Реальные результаты, реальные люди',
    'home.reviews.subtitle': 'Узнайте, что говорит наше сообщество о преображении своей кожи',
    'home.reviews.skin.combination': 'Комбинированная',
    'home.reviews.skin.sensitive': 'Чувствительная',
    'home.reviews.skin.dry': 'Сухая',
    'home.cta.title': 'Готовы познакомиться со своей кожей?',
    'home.cta.subtitle': 'Присоединяйтесь к 50 000+ людей, которые нашли идеальный уход.',
    'home.cta.button': 'Начать бесплатный анализ',
    'home.finalCta.title': 'Ваш идеальный уход за кожей в 2 минутах',
    'home.finalCta.subtitle': 'Без регистрации. Сделайте селфи, ответьте на несколько вопросов, и наш ИИ сделает остальное.',
    'home.footer.privacy': 'Политика конфиденциальности',
    'home.footer.terms': 'Условия использования',
    'home.footer.contact': 'Контакты',

    'welcome.tagline': 'Анализ кожи на основе ИИ',
    'welcome.title': 'Откройте для себя идеальный уход за кожей',
    'welcome.subtitle': 'Сделайте быстрое фото и ответь��е на несколько вопросов, чтобы получить персональные рекомендации по уходу за кожей.',
    'welcome.feature.scan': 'Сканирование лица',
    'welcome.feature.scanDesc': 'Быстрый ИИ-анализ вашей кожи',
    'welcome.feature.survey': 'Умный опрос',
    'welcome.feature.surveyDesc': 'Понять проблемы вашей кожи',
    'welcome.feature.results': 'Персональные результаты',
    'welcome.feature.resultsDesc': 'Получить индивидуальные рекомендации по продуктам',
    'welcome.cta': 'Начать анализ',
    'welcome.privacy': 'Ваши фото обрабатываются локально и никогда не сохраняются',

    'camera.title': 'Сделайте фото',
    'camera.guide': 'Поместите лицо в овал',
    'camera.error': 'Нет доступа к камере. Пожалуйста, разрешите доступ к камере.',
    'camera.retry': 'Повторить',

    'scanning.title': 'Анализируем вашу кожу',
    'scanning.subtitle': 'Подождите, пока мы обрабатываем ваше фото',
    'scanning.step.texture': 'Анализ текстуры кожи...',
    'scanning.step.pores': 'Определение размера пор...',
    'scanning.step.hydration': 'Измерение уровня увлажнения...',
    'scanning.step.blemishes': 'Проверка несовершенств...',
    'scanning.step.tone': 'Оценка тона кожи...',
    'scanning.step.processing': 'Обработка результатов...',
    'scanning.stat.texture': 'Текстура',
    'scanning.stat.hydration': 'Увлажнение',
    'scanning.stat.tone': 'Тон',
    'scanning.stat.analyzed': 'Проанализировано',
    'scanning.stat.scanning': 'Сканирование',

    'survey.multiSelectHint': 'Выберите все подходящие ва��ианты',
    'survey.seeResults': 'Смотреть результаты',
    'survey.q1': 'Как ощущается ваша кожа через несколько часов после умывания?',
    'survey.q1.veryOily': 'Очень жирная',
    'survey.q1.veryOilyDesc': 'Блестит везде',
    'survey.q1.oily': 'Немного жирная',
    'survey.q1.oilyDesc': 'Жирная в Т-зоне',
    'survey.q1.balanced': 'Сбалансированная',
    'survey.q1.balancedDesc': 'Ни жирная, ни сухая',
    'survey.q1.dry': 'Немного сухая',
    'survey.q1.dryDesc': 'Ощущается стянутость в некоторых зонах',
    'survey.q1.veryDry': 'Очень сухая',
    'survey.q1.veryDryDesc': 'Стянутая и шелушащаяся',
    'survey.q2': 'Как ваша кожа реагирует на новые продукты?',
    'survey.q2.verySensitive': 'Очень чувствительная',
    'survey.q2.verySensitiveDesc': 'Легко жжёт или щиплет',
    'survey.q2.sensitive': 'Немного чувствительная',
    'survey.q2.sensitiveDesc': 'Периодические реакции',
    'survey.q2.notSensitive': 'Не чувствительная',
    'survey.q2.notSensitiveDesc': 'Редко реагирует',
    'survey.q3': 'Как бы вы описали увлажнённость вашей кожи?',
    'survey.q3.veryDry': 'Очень обезвоженная',
    'survey.q3.veryDryDesc': 'Постоянно требует увлажнения',
    'survey.q3.dry': 'Часто сухая',
    'survey.q3.dryDesc': 'Нужно регулярное увлажнение',
    'survey.q3.normal': 'Хорошо увлажнённая',
    'survey.q3.normalDesc': 'Баланс влажности в норме',
    'survey.q3.oily': 'Избыточно увлажнённая',
    'survey.q3.oilyDesc': 'Можно пропустить увлажнитель',
    'survey.q4': 'Какие основные проблемы вашей кожи?',
    'survey.q4.acne': 'Акне и высыпания',
    'survey.q4.aging': 'Мелкие морщины',
    'survey.q4.darkSpots': 'Тёмные пятна и неровный тон',
    'survey.q4.redness': 'Покраснение и раздражение',
    'survey.q4.pores': 'Расширенные поры',
    'survey.q4.dullness': 'Тусклость и отсутствие сияния',
    'survey.q5': 'Какой у вас сейчас уход за кожей?',
    'survey.q5.minimal': 'Минимальный',
    'survey.q5.minimalDesc': 'Только очищение и, возможно, увлажнение',
    'survey.q5.basic': 'Базовый',
    'survey.q5.basicDesc': 'Очищение, увлажнение, солнцезащита',
    'survey.q5.intermediate': 'Средний',
    'survey.q5.intermediateDesc': 'Включая сыворотки и лечение',
    'survey.q5.advanced': 'Продвинутый',
    'survey.q5.advancedDesc': 'Множество продуктов и шагов',

    'results.title': 'Ваши результаты',
    'results.skinType': 'Ваш тип кожи',
    'results.keyFindings': 'Основные выводы',
    'results.tips': 'Советы по уходу за кожей',
    'results.products': 'Рекомендуемые продукты',
    'results.seeAll': 'Смотреть все',
    'results.routine.title': 'Ваш ежедневный уход',
    'results.routine.morning': 'Утро',
    'results.routine.evening': 'Вечер',
    'results.restart': 'Начать новый анализ',
    'results.addToRoutine': 'Добавить в уход',
    'results.skinType.oily': 'Жирная',
    'results.skinType.dry': 'Сухая',
    'results.skinType.combination': 'Комбинированная',
    'results.skinType.sensitive': 'Чувствительная',
    'results.skinType.normal': 'Нормальная',
    'results.tip.oily': 'Сосредоточьтесь на контроле жирности и мягком очищении без пересушивания.',
    'results.tip.dry': 'Приоритет — увлажнение и ингредиенты, удерживающие влагу, например, керамиды.',
    'results.tip.combination': 'Баланс — главное. Используйте целевые средства для разных зон.',
    'results.tip.sensitive': 'Мягкие продукты без отдушек — ваши лучшие друзья.',
    'results.tip.normal': 'Поддерживайте здоровье кожи профилактическим уходом.',
    'results.skinScore': 'Оценка кожи:',
    'results.metricsTitle': 'Показатели анализа кожи',
    'results.metric.hydration': 'Увлажнение',
    'results.metric.oiliness': 'Жирность',
    'results.metric.texture': 'Текстура',
    'results.metric.clarity': 'Чистота',
    'results.metric.elasticity': 'Упругость',
    'results.metricStatus.excellent': 'Отлично',
    'results.metricStatus.good': 'Хорошо',
    'results.metricStatus.fair': 'Удовлетворительно',
    'results.metricStatus.needsAttention': 'Требует внимания',
    'history.title': 'История сканов',
    'history.emptyTitle': 'Сохраненных сканов пока нет.',
    'history.emptySubtitle': 'Завершите сканирование лица, чтобы увидеть историю.',
    'history.notFoundTitle': 'Скан не найден',
    'history.notFoundSubtitle': 'Этот скан мог быть удален из локальной истории.',
    'history.viewHistory': 'Открыть историю',
    'history.open': 'Открыть',

    'products.title': 'Продукты',
    'products.searchPlaceholder': 'Поиск по названию, бренду или описанию...',
    'products.allBrands': 'Все бренды',
    'products.allTypes': 'Все типы',
    'products.noProducts': 'Продукты ещё не добавлены',
    'products.noProductsFiltered': 'Попробуйте изменить фильтры или поисковый запрос',
    'products.clearFilters': 'Сбросить фильтры',
    'products.filters': 'Фильтры:',
    'products.clearAll': 'Сбросить всё',
    'products.searchLabel': 'Поиск:',
    'products.brandLabel': 'Бренд:',
    'products.typeLabel': 'Тип:',
    'products.product': 'продукт',
    'products.products': 'продуктов',
    'products.addToRoutine': 'Добавить в уход',
    'products.usageTip': 'Как применять',
    'products.viewDetails': 'Подробнее',
    'product.back': 'Назад к продуктам',
    'product.usageTip': 'Как применять',
    'product.description': 'Об этом продукте',
    'product.addToRoutine': 'Добавить в уход',
    'product.notFound': 'Продукт не найден',

    'admin.title': 'Администратор',
    'admin.subtitle': 'Управляйте продуктами ухода',
    'admin.addProduct': 'Добавить продукт',
    'admin.editProduct': 'Редактировать продукт',
    'admin.deleteConfirm': 'Вы уверены, что хотите удалить "{name}"? Это действие нельзя отменить.',
    'admin.totalProducts': 'Всего продуктов',
    'admin.totalBrands': 'Всего брендов',
    'admin.avgPrice': 'Средняя цена',
    'admin.view.list': 'Список',
    'admin.view.cards': 'Карточки',
    'admin.tab.products': 'Продукты',
    'admin.tab.reviews': 'Отзывы',
    'admin.totalReviews': 'Всего отзывов',
    'admin.averageRating': 'Средняя оценка',
    'admin.reviews.author': 'Автор',
    'admin.reviews.rating': 'Оценка',
    'admin.reviews.comment': 'Комментарий',
    'admin.reviews.date': 'Дата',
    'admin.noProducts': 'Пока нет продуктов',
    'admin.addProductHint': 'Нажмите "Добавить продукт", чтобы начать',
    'admin.noReviews': 'Пока нет отзывов',
    'admin.reviews.aiAnalyze': 'ИИ-анализ',
    'admin.reviews.aiTitle': 'Сводка отзывов от ИИ',
    'admin.reviews.period': 'Период',
    'admin.reviews.period.1d': 'Последний 1 день',
    'admin.reviews.period.1w': 'Последняя 1 неделя',
    'admin.reviews.period.1m': 'Последний 1 месяц',
    'admin.reviews.period.3m': 'Последние 3 месяца',
    'admin.reviews.period.6m': 'Последние 6 месяцев',
    'admin.reviews.generate': 'Сгенерировать сводку',
    'admin.reviews.analyzing': 'Анализ...',
    'admin.reviews.analyzedCount': 'Проанализировано отзывов: {count}',
    'admin.reviews.actions': 'Действия',
    'admin.reviews.remove': 'Удалить',
    'admin.reviews.deleteTitle': 'Удалить отзыв',
    'admin.reviews.deleteConfirm': 'Удалить отзыв от {name}? Это действие нельзя отменить.',

    'review.title': 'Оставить отзыв',
    'review.name': 'Ваше имя',
    'review.namePlaceholder': 'Введите ваше имя',
    'review.rating': 'Оценка',
    'review.comment': 'Ваш отзыв',
    'review.commentPlaceholder': 'Поделитесь своим опытом использования MizuCaire...',
    'review.submit': 'Отправить отзыв',
    'review.submitting': 'Отправка...',
    'review.thankYou': 'Спасибо!',
    'review.submitted': 'Ваш отзыв отправлен и появится на главной странице.',
  },

  kz: {
    'common.loading': 'Жүктелуде...',
    'common.error': 'Қате',
    'common.save': 'Сақтау',
    'common.cancel': 'Болдырмау',
    'common.delete': 'Жою',
    'common.edit': 'Өзгерту',
    'common.add': 'Қосу',
    'common.added': 'Қосылды',
    'common.search': 'Іздеу',
    'common.filter': 'Сүзгі',
    'common.all': 'Барлығы',
    'common.retry': 'Қайталау',
    'common.continue': 'Жалғастыру',
    'common.back': 'Артқа',
    'common.of': '/',
    'common.next': 'Келесі',
    'common.previous': 'Алдыңғы',
    'common.page': 'Бет',

    'basket.addedToBasket': 'Себетке қосылды',

    'nav.home': 'Басты бет',
    'nav.products': 'Өнімдер',
    'nav.science': 'Ғылым',
    'nav.reviews': 'Пікірлер',
    'nav.consulting': 'Кеңес беру',
    'nav.history': 'Тарих',
    'nav.admin': 'Әкімші',
    'nav.tryScan': 'Сканерлеу',

    'home.badge': '2 минуттық ЖИ тері талдауы',
    'home.hero.title1': 'Сіздің терің,',
    'home.hero.title2': 'Шешілді.',
    'home.hero.subtitle': 'Болжамды тоқтатыңыз. MizuCaire компьютерлік көру арқылы теріңіздің бірегей профилін жасайды және нақты жұмыс істейтін күтім бағдарламасы�� жасайды.',
    'home.hero.cta': 'Теріні талдау',
    'home.hero.science': 'Тегін кеңес',
    'home.stats.scans': 'Сканерлеу аяқталды',
    'home.stats.rating': 'Пайдаланушы рейтингі',
    'home.stats.accuracy': 'Дәлдік деңгейі',
    'home.floating.hydration': 'Ылғалдандыру',
    'home.floating.poreSize': 'Тесік өлшемі',
    'home.floating.poreValue': 'Кішкентай',
    'home.floating.skinScore': 'Тері ұпайы',
    'home.science.tag': 'Ғылым',
    'home.science.title': 'Көзге көрінбейтінді талдаймыз',
    'home.science.subtitle': 'Біздің ЖИ 14-тен астам тері көрсеткіштерін зерттейді — бет текстурасынан тесік тығыздығына, ылғалдану үлгілеріне және меланин таралуына дейін — теріңіздің денсаулығының толық суретін жасау үшін.',
    'home.science.preview': 'Талдауды алдын ала қарау',
    'home.science.texture': 'Текстура картасы',
    'home.science.textureDesc': 'Бет бедерін талдау',
    'home.science.hydration': 'Ылғалдану индексі',
    'home.science.hydrationDesc': 'Ылғалдылық деңгейін анықтау',
    'home.science.pore': 'Тесік талдауы',
    'home.science.poreDesc': 'Өлшем және тығыздық картасы',
    'home.science.oil': 'Май балансы',
    'home.science.oilDesc': 'Себум өндіру деңгейі',
    'home.why.title': 'Адамдар неліктен MizuCaire таңдайды',
    'home.why.subtitle': 'Нақты нәтиже қалайтын нақты адамдар үшін жасалған.',
    'home.why.speed.title': '2 минут',
    'home.why.speed.desc': 'Селфиден толық жеке күтім бағдарламасына дейін. Ұзын сауалнамасыз.',
    'home.why.privacy.title': '100% Жеке',
    'home.why.privacy.desc': 'Фотоларыңыз ешқашан құрылғыдан шықпайды. Серверлерімізде деректер сақталмайды.',
    'home.why.derm.title': 'Дерматолог деңгейі',
    'home.why.derm.desc': 'Клиникалық тері күтімі зерттеулеріне негізделген ұсыныстар.',
    'home.why.allSkin.title': 'Барлық тері түрлері',
    'home.why.allSkin.desc': 'Майлы теріден сезімталға, жас теріден жетілген теріге дейін — барлығыңызға көмектесеміз.',
    'home.reviews.title': 'Нақты нәтижелер, нақты адамдар',
    'home.reviews.subtitle': 'Қауымдастығымыздың тері өзгерісі туралы айтқандарын оқыңыз',
    'home.reviews.skin.combination': 'Аралас',
    'home.reviews.skin.sensitive': 'Сезімтал',
    'home.reviews.skin.dry': 'Құрғақ',
    'home.cta.title': 'Теріңізбен танысуға дайынсыз ба?',
    'home.cta.subtitle': '50 000+ адаммен бірге мінсіз күтім бағдарламасын тауып алыңыз.',
    'home.cta.button': 'Тегін талдауды бастау',
    'home.finalCta.title': 'Сіздің мінсіз тері күтімі жоспарыңызға 2 минут қалды',
    'home.finalCta.subtitle': 'Тіркелу қажет емес. Селфи түсіріп, бірнеше сұраққа жауап беріңіз, қалғанын ЖИ жасайды.',
    'home.footer.privacy': 'Құпиялылық саясаты',
    'home.footer.terms': 'Қызмет шарттары',
    'home.footer.contact': 'Байланыс',

    'welcome.tagline': 'ЖИ-ге негізделген тері талдауы',
    'welcome.title': 'Мінсіз тері күтімін табыңыз',
    'welcome.subtitle': 'Жылдам фото түсіріп, бірнеше сұраққа жауап беріп, тек сізге арналған жеке тері күтімі ұсыныстарын алыңыз.',
    'welcome.feature.scan': 'Бет сканерлеу',
    'welcome.feature.scanDesc': 'Теріңіздің жылдам ЖИ талдауы',
    'welcome.feature.survey': 'Ақылды сауалнама',
    'welcome.feature.surveyDesc': 'Тері мәселелеріңізді түсіну',
    'welcome.feature.results': 'Жеке нәтижелер',
    'welcome.feature.resultsDesc': 'Арнайы өнім ұсыныстарын алу',
    'welcome.cta': 'Талдауды бастау',
    'welcome.privacy': 'Фотоларыңыз жергілікті өңделеді және ешқашан сақталмайды',

    'camera.title': 'Фото түсіру',
    'camera.guide': 'Бетіңізді сопақшаға орналастырыңыз',
    'camera.error': 'Камераға қол жеткізу мүмкін емес. Камераға рұқсат беріңіз.',
    'camera.retry': 'Қайталау',

    'scanning.title': 'Теріңіз талданып жатыр',
    'scanning.subtitle': 'Фотоңызды өңдеп жатқанымызды күтіңіз',
    'scanning.step.texture': 'Тері текстурасын талдау...',
    'scanning.step.pores': 'Тесік өлшемін анықтау...',
    'scanning.step.hydration': 'Ылғалдану деңгейін өлшеу...',
    'scanning.step.blemishes': 'Кемшіліктерді тексеру...',
    'scanning.step.tone': 'Тері тонын бағалау...',
    'scanning.step.processing': 'Нәтижелерді өңдеу...',
    'scanning.stat.texture': 'Текстура',
    'scanning.stat.hydration': 'Ылғалдану',
    'scanning.stat.tone': 'Тон',
    'scanning.stat.analyzed': 'Талданды',
    'scanning.stat.scanning': 'Сканерлеу',

    'survey.multiSelectHint': 'Барлық қолайлы нұсқаларды таңдаңыз',
    'survey.seeResults': 'Нәтижелерді көру',
    'survey.q1': 'Тазалағаннан бірнеше сағат өткен соң теріңіз қалай сезінеді?',
    'survey.q1.veryOily': 'Өте майлы',
    'survey.q1.veryOilyDesc': 'Барлық жерде жылтырайды',
    'survey.q1.oily': 'Біраз майлы',
    'survey.q1.oilyDesc': 'Т-аймақта майлы',
    'survey.q1.balanced': 'Теңгерімді',
    'survey.q1.balancedDesc': 'Майлы да, құрғақ та емес',
    'survey.q1.dry': 'Біраз құрғақ',
    'survey.q1.dryDesc': 'Кейбір жерлерде тартылу сезіледі',
    'survey.q1.veryDry': 'Өте құрғақ',
    'survey.q1.veryDryDesc': 'Тартылған және қабыршақты',
    'survey.q2': 'Теріңіз жаңа өнімдерге қалай реакция береді?',
    'survey.q2.verySensitive': 'Өте сезімтал',
    'survey.q2.verySensitiveDesc': 'Жеңіл жанады немесе шаншиды',
    'survey.q2.sensitive': 'Біраз сезімтал',
    'survey.q2.sensitiveDesc': 'Кейде реакция болады',
    'survey.q2.notSensitive': 'Сезімтал емес',
    'survey.q2.notSensitiveDesc': 'Сирек реакция береді',
    'survey.q3': 'Теріңіздің ылғалдануын қалай сипаттар едіңіз?',
    'survey.q3.veryDry': 'Өте сусызданған',
    'survey.q3.veryDryDesc': 'Үнемі ылғалдандыруды қажет етеді',
    'survey.q3.dry': 'Жиі құрғайды',
    'survey.q3.dryDesc': 'Тұрақты ылғалдандыру қажет',
    'survey.q3.normal': 'Жақсы ылғалданған',
    'survey.q3.normalDesc': 'Ылғалдылық балансы қалыпты',
    'survey.q3.oily': 'Шамадан тыс ылғалданған',
    'survey.q3.oilyDesc': 'Ылғалдандырғышты өткізіп жіберуге болады',
    'survey.q4': 'Теріңіздің негізгі мәселелері қандай?',
    'survey.q4.acne': 'Акне және бөртпелер',
    'survey.q4.aging': 'Ұсақ әжімдер',
    'survey.q4.darkSpots': 'Қара дақтар және біркелкі емес тон',
    'survey.q4.redness': 'Қызару және тітіркену',
    'survey.q4.pores': 'Кеңейген тесіктер',
    'survey.q4.dullness': 'Тұнықсыздық және жарқырау жоқ',
    'survey.q5': 'Қазіргі тері күтіміңіз қандай?',
    'survey.q5.minimal': 'Минималды',
    'survey.q5.minimalDesc': 'Тек тазалау және мүмкін ылғалдандыру',
    'survey.q5.basic': 'Негізгі',
    'survey.q5.basicDesc': 'Тазалау, ылғалдандыру, күн қорғаныш',
    'survey.q5.intermediate': 'Орташа',
    'survey.q5.intermediateDesc': 'Сарысулар мен ем кіреді',
    'survey.q5.advanced': 'Кеңейтілген',
    'survey.q5.advancedDesc': 'Көптеген өнімдер мен қадамдар',

    'results.title': 'Сіздің нәтижелеріңіз',
    'results.skinType': 'Тері түріңіз',
    'results.keyFindings': 'Негізгі тұжырымдар',
    'results.tips': 'Тері күтімі кеңестері',
    'results.products': 'Ұсынылатын өнімдер',
    'results.seeAll': 'Барлығын көру',
    'results.routine.title': 'Күнделікті күтіміңіз',
    'results.routine.morning': 'Таңертең',
    'results.routine.evening': 'Кешке',
    'results.restart': 'Жаңа талдауды бастау',
    'results.addToRoutine': 'Күтімге қосу',
    'results.skinType.oily': 'Майлы',
    'results.skinType.dry': 'Құрғақ',
    'results.skinType.combination': 'Аралас',
    'results.skinType.sensitive': 'Сезімтал',
    'results.skinType.normal': 'Қалыпты',
    'results.tip.oily': 'Майлылықты бақылауға және теріні кептірмей жұмсақ тазалауға назар аударыңыз.',
    'results.tip.dry': 'Ылғалдандыруды және церамидтер сияқты ылғалды ұстайтын компоненттерді басымдыққа алыңыз.',
    'results.tip.combination': 'Теңгерім — бастысы. Әртүрлі аймақтар үшін арнайы күтімді қолданыңыз.',
    'results.tip.sensitive': 'Хош иіссіз жұмсақ өнімдер — сіздің ең жақсы достарыңыз.',
    'results.tip.normal': 'Профилактикалық күтіммен теріңіздің денсаулығын сақтаңыз.',
    'results.skinScore': 'Тері ұпайы:',
    'results.metricsTitle': 'Тері талдау көрсеткіштері',
    'results.metric.hydration': 'Ылғалдану',
    'results.metric.oiliness': 'Майлылық',
    'results.metric.texture': 'Текстура',
    'results.metric.clarity': 'Тазалық',
    'results.metric.elasticity': 'Серпімділік',
    'results.metricStatus.excellent': 'Өте жақсы',
    'results.metricStatus.good': 'Жақсы',
    'results.metricStatus.fair': 'Қанағаттанарлық',
    'results.metricStatus.needsAttention': 'Назар қажет',
    'history.title': 'Скан тарихы',
    'history.emptyTitle': 'Сақталған скан әлі жоқ.',
    'history.emptySubtitle': 'Тарихты көру үшін бет сканын аяқтаңыз.',
    'history.notFoundTitle': 'Скан табылмады',
    'history.notFoundSubtitle': 'Бұл скан жергілікті тарихтан жойылған болуы мүмкін.',
    'history.viewHistory': 'Тарихты ашу',
    'history.open': 'Ашу',

    'products.title': 'Өнімдер',
    'products.searchPlaceholder': 'Атауы, бренді немесе сипаттамасы бойынша іздеу...',
    'products.allBrands': 'Барлық брендтер',
    'products.allTypes': 'Барлық түрлер',
    'products.noProducts': 'Өнімдер әлі қосылмаған',
    'products.noProductsFiltered': 'Сүзгілерді немесе іздеу сұрауын өзгертіп көріңіз',
    'products.clearFilters': 'Сүзгілерді тазалау',
    'products.filters': 'Сүзгілер:',
    'products.clearAll': 'Барлығын тазалау',
    'products.searchLabel': 'Іздеу:',
    'products.brandLabel': 'Бренд:',
    'products.typeLabel': 'Түр:',
    'products.product': 'өнім',
    'products.products': 'өнім',
    'products.addToRoutine': 'Күтімге қосу',
    'products.usageTip': 'Қолдану жолы',
    'products.viewDetails': 'Толығырақ',
    'product.back': 'Өнімдерге оралу',
    'product.usageTip': 'Қолдану жолы',
    'product.description': 'Өнім туралы',
    'product.addToRoutine': 'Күтімге қосу',
    'product.notFound': 'Өнім табылмады',

    'admin.title': 'Әкімші',
    'admin.subtitle': 'Өнімдерді басқару',
    'admin.addProduct': 'Өнім қосу',
    'admin.editProduct': 'Өнімді өзгерту',
    'admin.deleteConfirm': '"{name}" өнімін жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті болдырмау мүмкін емес.',
    'admin.totalProducts': 'Жалпы өнімдер',
    'admin.totalBrands': 'Жалпы брендтер',
    'admin.avgPrice': 'Орт. баға',
    'admin.view.list': 'Тізім',
    'admin.view.cards': 'Карталар',
    'admin.tab.products': 'Өнімдер',
    'admin.tab.reviews': 'Пікірлер',
    'admin.totalReviews': 'Жалпы пікірлер',
    'admin.averageRating': 'Орташа баға',
    'admin.reviews.author': 'Автор',
    'admin.reviews.rating': 'Бағалау',
    'admin.reviews.comment': 'Пікір',
    'admin.reviews.date': 'Күні',
    'admin.noProducts': 'Әзірге өнімдер жоқ',
    'admin.addProductHint': 'Бастау үшін "Өнім қосу" түймесін басыңыз',
    'admin.noReviews': 'Әзірге пікірлер жоқ',
    'admin.reviews.aiAnalyze': 'ЖИ талдауы',
    'admin.reviews.aiTitle': 'ЖИ пікір қорытындысы',
    'admin.reviews.period': 'Кезең',
    'admin.reviews.period.1d': 'Соңғы 1 күн',
    'admin.reviews.period.1w': 'Соңғы 1 апта',
    'admin.reviews.period.1m': 'Соңғы 1 ай',
    'admin.reviews.period.3m': 'Соңғы 3 ай',
    'admin.reviews.period.6m': 'Соңғы 6 ай',
    'admin.reviews.generate': 'Қорытынды жасау',
    'admin.reviews.analyzing': 'Талданып жатыр...',
    'admin.reviews.analyzedCount': 'Талданған пікір саны: {count}',
    'admin.reviews.actions': 'Әрекеттер',
    'admin.reviews.remove': 'Жою',
    'admin.reviews.deleteTitle': 'Пікірді жою',
    'admin.reviews.deleteConfirm': '{name} пайдаланушысының пікірін жоясыз ба? Бұл әрекетті болдырмау мүмкін емес.',

    'review.title': 'Пікір қалдыру',
    'review.name': 'Сіздің атыңыз',
    'review.namePlaceholder': 'Атыңызды енгізіңіз',
    'review.rating': 'Бағалау',
    'review.comment': 'Сіздің пікіріңіз',
    'review.commentPlaceholder': 'MizuCaire тәжірибеңізбен бөлісіңіз...',
    'review.submit': 'Пікірді жіберу',
    'review.submitting': 'Жіберілуде...',
    'review.thankYou': 'Рахмет!',
    'review.submitted': 'Сіздің пікіріңіз жіберілді және басты бетте көрінеді.',
  },
}
