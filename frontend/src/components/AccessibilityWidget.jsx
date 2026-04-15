import { useState, useEffect, useCallback } from 'react';
import {
  Accessibility, X, Type, AlignLeft, Zap, Eye, Monitor,
  Link2, Target, RotateCcw, ChevronRight,
} from 'lucide-react';

const defaultSettings = {
  textSize: 'default',
  textSpacing: false,
  reduceMotion: false,
  screenReader: false,
  highContrast: false,
  colorBlindness: 'none',
  underlineLinks: false,
  enhancedFocus: false,
};

const STORAGE_KEY = 'ish-a11y-settings';

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function applyClasses(settings) {
  const html = document.documentElement;
  html.classList.remove('a11y-text-lg', 'a11y-text-xl', 'a11y-text-xxl');
  if (settings.textSize === 'large') html.classList.add('a11y-text-lg');
  if (settings.textSize === 'xl') html.classList.add('a11y-text-xl');
  if (settings.textSize === 'xxl') html.classList.add('a11y-text-xxl');

  html.classList.toggle('a11y-spacing', settings.textSpacing);
  html.classList.toggle('a11y-no-motion', settings.reduceMotion);
  html.classList.toggle('a11y-sr-mode', settings.screenReader);
  html.classList.toggle('a11y-high-contrast', settings.highContrast);
  html.classList.toggle('a11y-underline-links', settings.underlineLinks);
  html.classList.toggle('a11y-focus-enhanced', settings.enhancedFocus);

  html.classList.remove('a11y-cb-protanopia', 'a11y-cb-deuteranopia', 'a11y-cb-tritanopia', 'a11y-cb-achroma');
  if (settings.colorBlindness !== 'none') {
    html.classList.add(`a11y-cb-${settings.colorBlindness}`);
  }
}

const textSizeOptions = [
  { value: 'default', label: 'Default' },
  { value: 'large', label: 'Large' },
  { value: 'xl', label: 'X-Large' },
  { value: 'xxl', label: 'XX-Large' },
];

const cbOptions = [
  { value: 'none', label: 'None' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
  { value: 'achroma', label: 'Monochrome' },
];

function ToggleControl({ label, icon: Icon, checked, onChange, testId }) {
  return (
    <button
      onClick={onChange}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-2 transition-colors ${
        checked ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 text-foreground hover:border-gray-400'
      }`}
      role="switch"
      aria-checked={checked}
      data-testid={testId}
    >
      <Icon size={18} aria-hidden="true" />
      <span className="font-body text-sm font-medium flex-1">{label}</span>
      <div className={`w-8 h-5 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${checked ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
      </div>
    </button>
  );
}

function SelectControl({ label, icon: Icon, value, options, onChange, testId }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 px-1">
        <Icon size={16} aria-hidden="true" className="text-muted-foreground" />
        <span className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 font-body text-xs font-medium border-2 transition-colors ${
              value === opt.value
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 text-foreground hover:border-gray-400'
            }`}
            aria-pressed={value === opt.value}
            data-testid={`${testId}-${opt.value}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    applyClasses(settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleKey = useCallback((key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetAll = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const isModified = JSON.stringify(settings) !== JSON.stringify(defaultSettings);

  return (
    <>
      {/* SVG Filters for Color Blindness */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      {/* Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 flex items-center justify-center border-2 border-black transition-transform hover:scale-110 ${
          isOpen ? 'bg-black text-white' : 'bg-accent text-black'
        }`}
        aria-label={isOpen ? 'Close accessibility options' : 'Open accessibility options'}
        aria-expanded={isOpen}
        data-testid="accessibility-widget-trigger"
        style={{ boxShadow: '3px 3px 0px 0px #000' }}
      >
        {isOpen ? <X size={24} /> : <Accessibility size={24} />}
      </button>

      {/* Widget Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 w-80 max-w-[calc(100vw-48px)] bg-white border-2 border-black a11y-widget-panel"
          role="dialog"
          aria-label="Accessibility Settings"
          data-testid="accessibility-widget-panel"
          style={{ boxShadow: '6px 6px 0px 0px #000' }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-foreground text-white">
            <h2 className="font-heading text-base uppercase tracking-wide">Accessibility</h2>
            <button
              onClick={resetAll}
              className={`flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider px-2 py-1 transition-colors ${
                isModified
                  ? 'text-accent hover:text-white border border-accent'
                  : 'text-gray-600 cursor-default opacity-0 pointer-events-none'
              }`}
              data-testid="a11y-reset-button"
              aria-label="Reset all accessibility settings"
              disabled={!isModified}
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>

          <div className="p-4 space-y-4">
            <SelectControl
              label="Text Size"
              icon={Type}
              value={settings.textSize}
              options={textSizeOptions}
              onChange={(v) => update('textSize', v)}
              testId="a11y-text-size"
            />

            <ToggleControl
              label="Wide Text Spacing"
              icon={AlignLeft}
              checked={settings.textSpacing}
              onChange={() => toggleKey('textSpacing')}
              testId="a11y-text-spacing"
            />

            <ToggleControl
              label="Reduce Animations"
              icon={Zap}
              checked={settings.reduceMotion}
              onChange={() => toggleKey('reduceMotion')}
              testId="a11y-reduce-motion"
            />

            <ToggleControl
              label="Screen Reader Mode"
              icon={Monitor}
              checked={settings.screenReader}
              onChange={() => toggleKey('screenReader')}
              testId="a11y-screen-reader"
            />

            <ToggleControl
              label="High Contrast"
              icon={Eye}
              checked={settings.highContrast}
              onChange={() => toggleKey('highContrast')}
              testId="a11y-high-contrast"
            />

            <ToggleControl
              label="Underline Links"
              icon={Link2}
              checked={settings.underlineLinks}
              onChange={() => toggleKey('underlineLinks')}
              testId="a11y-underline-links"
            />

            <ToggleControl
              label="Enhanced Focus"
              icon={Target}
              checked={settings.enhancedFocus}
              onChange={() => toggleKey('enhancedFocus')}
              testId="a11y-enhanced-focus"
            />

            <SelectControl
              label="Color Blindness"
              icon={ChevronRight}
              value={settings.colorBlindness}
              options={cbOptions}
              onChange={(v) => update('colorBlindness', v)}
              testId="a11y-color-blindness"
            />
          </div>
        </div>
      )}
    </>
  );
}
