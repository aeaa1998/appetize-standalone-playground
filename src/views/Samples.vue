<template>
  <div class="space-y-6">
    <header-one>Samples</header-one>
    <div>
      Select samples from the following options and unlock the possibilities of the SDK of
      Appetize.io
    </div>
    <div class="flex flex-row flex-wrap gap-6">
      <card v-for="sample in samples" class="w-[550px] px-4 py-6" :key="sample.path">
        <template #body>
          <div class="space-y-8 h-full flex flex-col justify-between">
            <div class="text-xl font-bold">{{ sample.title }}</div>
            <div>{{ sample.description }}</div>
            <v-button @click="router.push(sample.path)" class="min-w-64"> Sample </v-button>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { Card } from '@/components/cards'

const router = useRouter()

const samples = [
  {
    title: 'Playground Sample',
    description:
      'This sample page allows you to use a interactive standalone device with a custom app group public key or standalone public key.',
    path: '/sample/standalone'
  },
]
</script>
