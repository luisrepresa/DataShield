<template>
  <main>
    <HeroSection />
    <AboutSection />
    <HowWeHelpSection />
    <PlatformSection />
    <PricingSection />
  </main>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import HowWeHelpSection from '../components/HowWeHelpSection.vue'
import PlatformSection from '../components/PlatformSection.vue'
import PricingSection from '../components/PricingSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    AboutSection,
    HowWeHelpSection,
    PlatformSection,
    PricingSection
  }
}
</script>
