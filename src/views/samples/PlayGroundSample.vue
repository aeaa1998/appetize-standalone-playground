<template>
  <div class="flex flex-col pb-8 space-y-6 lg:space-y-0">
    <div class="flex flex-col space-y-6 items-center lg:space-y-0 lg:flex-row">
      <!-- Instructions and form -->
      <div class="flex-1 space-y-6 flex flex-col md:items-center lg:items-start">
        <header-two> Playground </header-two>
        <div class="text-gray sm:w-2/3">
          Enter your standalone or app group public key in order and enjoy your playground with appetize.
        </div>
        <div class="w-full md:w-2/3 space-y-4">
          <div class="space-y-2">
            <v-label for="publicKey">Public key</v-label>
            <v-input class="w-full" name="publicKey" placeholder="Enter your public key" v-model="playgroundForm.publicKey" />
          </div>
          <div class="space-x-2">
            <v-button
              @click="launchSession"
              :disabled="!isValid"
              class="w-full md:w-fit min-w-60"
            >
            Start session
            </v-button>
          </div>
        </div>
      </div>
      <appetize-client :applications="applications" :id="standaloneSampleId" />
    </div>
  </div>
</template>
<script setup>
import { AppetizeClient } from '@/components/appetize'
import { useAppetizeClientFromId } from '@/composables/appetize/useAppetizeClient.js'
import { computed, onMounted, reactive, ref } from 'vue'
import useNotification from '@/composables/notifications/useNotification'
import useFiles from '@/composables/files/useFiles.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const standaloneSampleId = 'standaloneSampleId'
const initialPublicKey = route?.query?.publicKey ?? 'standalone'
const initialApplication = {
  os: 'ios',
  publicKey: initialPublicKey
}
const sessionConfig = {
  device: 'iphone13pro',
  centered: 'both',
  scale: 'auto',
}

// The state containing all the properties for the playground form
const playgroundForm = reactive({
  publicKey: initialPublicKey == 'standalone' ? '' : initialPublicKey,
})

const applications = ref({
  android: initialPublicKey,
  ios: initialPublicKey,
})

// Notification object to show notifications
const notification = useNotification()
const { downloadFileFromBase64 } = useFiles()

// Consuming the composition we have the business logic and state to only be consumed and reduce the overhead of logic
const { appetize, onScreenshotTaken, appetizeControls } =
  useAppetizeClientFromId(standaloneSampleId, initialApplication, sessionConfig)

// Helper to see if it's empty or null
const isNotEmptyorNull = (value) => value != null && value != ''

// It's a valid form once both fields have values
const isValid = computed(() => isNotEmptyorNull(playgroundForm.publicKey))

// Start the flow programatically
const launchSession = async () => {
  // If there is a session lets clean it first
  await appetize.client.startSession({
    publicKey: playgroundForm.publicKey
  })
}

onMounted(() => {
  // Sets a listener whenever a ss was taken
  onScreenshotTaken(async (data) => {
    // Show notification ss was taken
    notification.showSuccess(
      'Screenshot taken',
      `The screenshot was successfully for ${appetizeControls.device}`
    )
    const filename = `${appetizeControls.device.toLowerCase()}_${appetizeControls.version.toLowerCase()}_${new Date().getTime()}.jpg`
        .replace(/ /g, '_');
    downloadFileFromBase64(filename, data)
    
  })
})
</script>
