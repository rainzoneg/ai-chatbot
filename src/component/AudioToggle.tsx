import { Icon } from "@iconify-icon/react";

interface Props {
  isAudioEnabled: boolean;
  toggleAudio: Function;
}

/**
 * Component to toggle the audio functionality of the chat interface on or off.
 * @param isAudioEnabled - Whether audio is enabled or not.
 * @param setEnableAudio - Function to set the audio enabled state.
 */
export default function AudioToggle({ isAudioEnabled, toggleAudio }: Props) {
  return (
    <div
      onClick={() => toggleAudio(!isAudioEnabled)}
      className="flex flex-row items-center text-left gap-2 hover:cursor-pointer"
    >
      {isAudioEnabled ? (
        <>
          <Icon icon="mdi:volume-high" className="w-auto text-white" />
          <p className="font-semibold text-white text-sm text-[15px]">Audio</p>
        </>
      ) : (
        <>
          <Icon icon="mdi:volume-off" className="w-auto text-white" />
          <p className="font-semibold text-gray-400/70 text-sm text-[15px]">Audio</p>
        </>
      )}
    </div>
  );
}
