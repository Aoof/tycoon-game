<script lang="ts">
  import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
  import type { HTMLFormAttributes } from "svelte/elements";
  import { Button } from "$lib/components/ui/button";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";

  import { processOtp, otp, user } from "$lib/stores/auth";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithElementRef<HTMLFormAttributes> = $props();
  const id = $props.id();
</script>
<div class={cn("flex flex-col gap-6", className)}>
  <form bind:this={ref} {...restProps}>
    <div class="flex flex-col gap-6 w-full items-center justify-center">
      <div class="flex flex-col items-center gap-2">
        <a href="/" class="flex flex-col items-center gap-2 font-medium">
          <div class="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEndIcon class="size-6" />
          </div>
          <span class="sr-only">Tycoon Game</span>
        </a>
        <h1 class="text-xl font-bold">Enter your OTP Code</h1>
      </div>
      <div class="flex flex-col gap-6 w-fit">
        <InputOTP.Root maxlength={6} bind:value={$otp}>
            {#snippet children({ cells })}
                <InputOTP.Group>
                {#each cells.slice(0, 3) as cell (cell)}
                    <InputOTP.Slot {cell} />
                {/each}
                </InputOTP.Group>
                <InputOTP.Separator />
                <InputOTP.Group>
                {#each cells.slice(3, 6) as cell (cell)}
                    <InputOTP.Slot {cell} />
                {/each}
                </InputOTP.Group>
            {/snippet}
        </InputOTP.Root>
        <Button type="submit" class="w-full">Submit</Button>
      </div>
    </div>
  </form>
</div>