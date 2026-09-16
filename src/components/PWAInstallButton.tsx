import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Check, Share } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If running inside standalone installed PWA
  if (isInstalled) {
    return (
      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
        <Check className="w-3 h-3" />
        Installed App
      </span>
    );
  }

  const handleButtonClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        id="btn-install-mobile-app"
        onClick={handleButtonClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all"
        title="Install Mobile App on Phone"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install App</span>
      </button>

      {/* Guide Modal for Mobile Installation (Android / iOS / Chrome) */}
      {showGuide && (
        <div
          id="install-guide-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#1e1e1e] p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Mobile App Install</h3>
                  <p className="text-[11px] text-neutral-500">Notepad on Home Screen</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-neutral-600 dark:text-neutral-300">
              {isInstallable ? (
                <div className="text-center py-2">
                  <p className="mb-3">
                    Click the button below to install this app directly on your device.
                  </p>
                  <button
                    onClick={async () => {
                      await install();
                      setShowGuide(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Install Now
                  </button>
                </div>
              ) : isIOS ? (
                <div className="space-y-3">
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                    iPhone ya iPad par install karne ka aasan tareeqa:
                  </p>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/60">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div>
                      Safari browser ke bottom toolbar mein <strong>Share</strong> icon (
                      <Share className="inline w-3.5 h-3.5 text-blue-500 mx-0.5" />) par tap karein.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/60">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div>
                      Neeche scroll karein aur <strong>"Add to Home Screen"</strong> par tap karein.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                    Android phone ya browser par install karne ka tareeqa:
                  </p>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/60">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div>
                      Chrome browser ke top right mein <strong>3 dots (⋮)</strong> menu par tap karein.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/60">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div>
                      <strong>"Install app"</strong> ya <strong>"Add to Home Screen"</strong> select karein. App icon aapke mobile par add ho jayega!
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              Theek hai (Done)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
