import React, { useState } from 'react';
import { getBirkatText } from '@/data/birkatText';
import { useHebrewCalendar } from '@/hooks/useHebrewCalendar';
import { Language, Nosach, PrayerFont } from '@/types/birkat';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { getTranslation, translateInstruction, translations } from '@/data/translations';

interface PrayerTextProps {
  language: Language;
  nosach: Nosach;
  phoneticMode: boolean;
  fontSize: number;
  prayerFont: PrayerFont;
}

const PRAYER_FONT_CLASS: Record<PrayerFont, string> = {
  frank: 'font-frank',
  david: 'font-david',
  assistant: 'font-assistant',
};

export const PrayerText = ({ language, nosach, phoneticMode, fontSize, prayerFont }: PrayerTextProps) => {
  const prayerFontClass = PRAYER_FONT_CLASS[prayerFont] ?? PRAYER_FONT_CLASS.frank;
  const calendar = useHebrewCalendar();
  const text = getBirkatText(language, nosach, phoneticMode);
  
  // RTL only for Hebrew non-phonetic
  const isRtl = language === 'hebrew' && !phoneticMode;

  const hasNikkud = (text: string): boolean => {
    // Check if text contains Hebrew nikkud (vowel marks)
    const nikkudRegex = /[\u0591-\u05C7]/;
    return nikkudRegex.test(text);
  };

  const hasHebrew = (text: string): boolean => {
    // Check if text contains Hebrew characters
    const hebrewRegex = /[\u0590-\u05FF]/;
    return hebrewRegex.test(text);
  };

  const renderLine = (line: string, idx: number) => {
    // Handle empty lines as spacing
    if (line.trim() === '') {
      return <div key={idx} className="h-4" />;
    }
    
    // Translate the line if it's an instruction
    const translatedLine = translateInstruction(line, language);
    
    // Check if line should be bold (marked with **)
    const isBold = translatedLine.startsWith('**') && translatedLine.endsWith('**');
    const displayLine = isBold ? translatedLine.slice(2, -2) : translatedLine;
    
    // Check if this line contains Hebrew text
    const lineHasHebrew = hasHebrew(displayLine);
    const lineDir = lineHasHebrew ? 'rtl' : undefined;
    
    // First check if the entire line is a comment
    // In phonetic mode, only check for parentheses, not nikkud
    const fullLineIsComment = displayLine.trim().startsWith('(') || (!phoneticMode && !hasNikkud(displayLine.trim()));
    
    if (fullLineIsComment) {
      return (
        <p key={idx} className={`leading-relaxed ${prayerFontClass} text-muted-foreground/60 ${isBold ? 'font-bold' : ''} ${lineHasHebrew ? 'text-right' : ''}`} dir={lineDir}>
          {displayLine}
        </p>
      );
    }

    // List of instructional prefixes to gray out (check all languages)
    const instructionalPrefixes = [
      // Hebrew
      translations.instructions.onRoshChodesh.hebrew,
      translations.instructions.onPesach.hebrew,
      translations.instructions.onSukkot.hebrew,
      translations.instructions.guestSays.hebrew,
      translations.instructions.inFathersHouse.hebrew,
      translations.instructions.marriedManSays.hebrew,
      translations.instructions.marriedWomanSays.hebrew,
      translations.instructions.onMussafDays.hebrew,
      translations.instructions.threeWhoAte.hebrew,
      translations.instructions.thosePresent.hebrew,
      translations.instructions.leaderSays.hebrew,
      translations.instructions.leaderRepeats.hebrew,
      translations.instructions.onTachanunDays.hebrew,
      translations.instructions.onNonTachanunDays.hebrew,
      translations.instructions.someAdd.hebrew,
      // English
      translations.instructions.onRoshChodesh.english,
      translations.instructions.onPesach.english,
      translations.instructions.onSukkot.english,
      translations.instructions.guestSays.english,
      translations.instructions.inFathersHouse.english,
      translations.instructions.marriedManSays.english,
      translations.instructions.marriedWomanSays.english,
      translations.instructions.onMussafDays.english,
      translations.instructions.threeWhoAte.english,
      translations.instructions.thosePresent.english,
      translations.instructions.leaderSays.english,
      translations.instructions.leaderRepeats.english,
      translations.instructions.onTachanunDays.english,
      translations.instructions.onNonTachanunDays.english,
      translations.instructions.someAdd.english,
      // French
      translations.instructions.onRoshChodesh.french,
      translations.instructions.onPesach.french,
      translations.instructions.onSukkot.french,
      translations.instructions.guestSays.french,
      translations.instructions.inFathersHouse.french,
      translations.instructions.marriedManSays.french,
      translations.instructions.marriedWomanSays.french,
      translations.instructions.onMussafDays.french,
      translations.instructions.threeWhoAte.french,
      translations.instructions.thosePresent.french,
      translations.instructions.leaderSays.french,
      translations.instructions.leaderRepeats.french,
      translations.instructions.onTachanunDays.french,
      translations.instructions.onNonTachanunDays.french,
      translations.instructions.someAdd.french,
      // Common variations
      "When three have eaten together they are obligated to form a zimmun and the leader begins:",
      "Those present respond",
      "The leader repeats",
    ];

    // Parse mixed content (Hebrew with instructional notes)
    const segments: Array<{ text: string; isComment: boolean }> = [];
    let currentPos = 0;
    
    // First, handle parentheses
    const parenRegex = /\([^)]+\)/g;
    let match;
    const parenMatches: Array<{ start: number; end: number; content: string }> = [];

    while ((match = parenRegex.exec(displayLine)) !== null) {
      parenMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[0]
      });
    }

    // Now process the line, checking for instructional prefixes
    while (currentPos < displayLine.length) {
      // Check if we're at the start of a parenthesis match
      const parenMatch = parenMatches.find(pm => pm.start === currentPos);
      
      if (parenMatch) {
        // Parse content inside parentheses
        const innerText = parenMatch.content.slice(1, -1); // Remove parentheses
        
        // Check if this is a blessing number that needs translation
        const translatedContent = translateInstruction(parenMatch.content, language);
        const isTranslated = translatedContent !== parenMatch.content;
        
        if (isTranslated) {
          // This is an instruction that was translated (like blessing numbers)
          segments.push({ text: translatedContent, isComment: true });
        } else {
          // Split by colon to separate instructional text from Hebrew
          const colonIndex = innerText.indexOf(':');
          if (colonIndex > -1) {
            const beforeColon = innerText.substring(0, colonIndex + 1);
            const afterColon = innerText.substring(colonIndex + 1);

            // Translate the instructional prefix (e.g. בחתונה: → "Au mariage :")
            const translatedBefore = translateInstruction(beforeColon, language);

            segments.push({ text: '(' + translatedBefore, isComment: true });
            segments.push({ text: afterColon + ')', isComment: false });
          } else {
            // In phonetic mode, parentheses content is not a comment unless it's instruction text
            segments.push({ text: parenMatch.content, isComment: phoneticMode ? false : !hasNikkud(innerText) });
          }
        }
        
        currentPos = parenMatch.end;
      } else {
        // Check for instructional prefixes
        let foundPrefix = false;
        for (const prefix of instructionalPrefixes) {
          if (displayLine.substring(currentPos).startsWith(prefix)) {
            // Translate the prefix to the current language
            const translatedPrefix = translateInstruction(prefix, language);
            segments.push({ text: translatedPrefix, isComment: true });
            currentPos += prefix.length;
            foundPrefix = true;
            break;
          }
        }
        
        if (!foundPrefix) {
          // Find the next special character (parenthesis or end of line)
          let nextSpecial = displayLine.length;
          const nextParen = parenMatches.find(pm => pm.start > currentPos);
          if (nextParen) {
            nextSpecial = Math.min(nextSpecial, nextParen.start);
          }
          
          // Also check for any instructional prefix
          for (const prefix of instructionalPrefixes) {
            const prefixPos = displayLine.indexOf(prefix, currentPos);
            if (prefixPos > currentPos) {
              nextSpecial = Math.min(nextSpecial, prefixPos);
            }
          }
          
          if (nextSpecial > currentPos) {
            segments.push({
              text: displayLine.substring(currentPos, nextSpecial),
              isComment: false
            });
            currentPos = nextSpecial;
          } else {
            currentPos++;
          }
        }
      }
    }

    // If no segments were created, render as single line
    if (segments.length === 0) {
      return (
        <p key={idx} className={`leading-relaxed ${prayerFontClass} ${isBold ? 'font-bold' : ''} ${lineHasHebrew ? 'text-right' : ''}`} dir={lineDir}>
          {displayLine}
        </p>
      );
    }

    // Mixed segments (instruction + prayer, or different directions): render as a
    // borderless vertical grid so each segment has its own dir + text-align and
    // Bidi reordering can't scramble the French/English punctuation against Hebrew.
    const hasMixedDirections = segments.some((s) => hasHebrew(s.text)) && segments.some((s) => !hasHebrew(s.text));
    const hasInstructionAndPrayer = segments.some((s) => s.isComment) && segments.some((s) => !s.isComment);
    const useGridLayout = segments.length > 1 && (hasMixedDirections || hasInstructionAndPrayer);

    if (useGridLayout) {
      return (
        <div key={idx} className={`grid gap-1 leading-relaxed ${prayerFontClass} ${isBold ? 'font-bold' : ''}`}>
          {segments.map((segment, segIdx) => {
            const segHasHebrew = hasHebrew(segment.text);
            const segDir = segHasHebrew ? 'rtl' : 'ltr';
            const align = segHasHebrew ? 'text-right' : 'text-left';
            const tone = segment.isComment ? 'text-muted-foreground/60 text-sm' : '';
            const cleaned = segHasHebrew ? segment.text.trim() : segment.text.replace(/^\s+|\s+$/g, '');
            if (!cleaned) return null;
            return (
              <div key={segIdx} dir={segDir} className={`${align} ${tone}`}>
                {cleaned}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <p key={idx} className={`leading-relaxed ${prayerFontClass} ${isBold ? 'font-bold' : ''} ${lineHasHebrew ? 'text-right' : ''}`} dir={lineDir}>
        {segments.map((segment, segIdx) => (
          <span key={segIdx} className={segment.isComment ? 'text-muted-foreground/60' : ''} dir={hasHebrew(segment.text) ? 'rtl' : undefined}>
            {segment.text}
          </span>
        ))}
      </p>
    );
  };

  const groupLines = (lines: string[]) => {
    const groups: Array<{ type: 'regular' | 'tossafot'; lines: string[] }> = [];
    let currentGroup: { type: 'regular' | 'tossafot'; lines: string[] } | null = null;

    lines.forEach((line) => {
      const isTossafot = line.trim().startsWith('(');
      
      if (!currentGroup || currentGroup.type !== (isTossafot ? 'tossafot' : 'regular')) {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = { type: isTossafot ? 'tossafot' : 'regular', lines: [line] };
      } else {
        currentGroup.lines.push(line);
      }
    });

    if (currentGroup) groups.push(currentGroup);
    return groups;
  };

  const renderSection = (lines: string[], sectionKey: string) => {
    const groups = groupLines(lines);
    let tossafotCounter = 0;

    return groups.map((group, groupIdx) => {
      if (group.type === 'regular') {
        return (
          <div key={`${sectionKey}-group-${groupIdx}`} className="space-y-2">
            {group.lines.map((line, idx) => renderLine(line, idx))}
          </div>
        );
      } else {
        tossafotCounter++;
        const tossafotKey = `${sectionKey}-tossafot-${tossafotCounter}`;
        return (
          <Collapsible key={tossafotKey} defaultOpen={false}>
            <CollapsibleTrigger className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
              <span className="text-sm font-medium">{getTranslation('tossafot', language)}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-2">
                {group.lines.map((line, idx) => renderLine(line, idx))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      }
    });
  };

  const [openSections, setOpenSections] = useState({
    zimmun: false,
    roshChodesh: false,
    chanukah: false,
    purim: false,
    shabbat: false,
    yaalehVeyavo: false,
    wedding: false,
    guestBlessing: false,
    britMilah: false,
    shevaBrachot: false,
  });

  const SectionCard = ({ children, sectionKey, transparent = false }: { children: string[]; sectionKey: string; transparent?: boolean }) => {
    // Check if the section contains Hebrew text
    const sectionHasHebrew = children.some(line => hasHebrew(line));
    const sectionDir = sectionHasHebrew ? 'rtl' : (isRtl ? 'rtl' : 'ltr');
    const sectionAlign = sectionHasHebrew ? 'text-right' : (isRtl ? 'text-right' : 'text-left');
    
    return (
      <Card className={`p-6 md:p-8 ${transparent ? 'bg-transparent border-0 shadow-none' : 'bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] border border-border/50'} rounded-[var(--radius)] transition-shadow duration-300`}>
        <div 
          className={`space-y-4 ${sectionAlign}`}
          style={{ fontSize: `${fontSize}px` }}
          dir={sectionDir}
        >
          {renderSection(children, sectionKey)}
        </div>
      </Card>
    );
  };

  const CollapsibleSection = ({ 
    isOpen, 
    onToggle, 
    titleKey, 
    children,
    isSpecial = false
  }: { 
    isOpen: boolean; 
    onToggle: () => void; 
    titleKey: keyof typeof translations; 
    children: React.ReactNode;
    isSpecial?: boolean;
  }) => {
    // In phonetic mode, use English transliteration for Hebrew, otherwise use the selected language
    const displayLanguage = phoneticMode && language === 'hebrew' ? 'english' : language;
    const title = getTranslation(titleKey, displayLanguage);
    
    // Check if content contains Hebrew text to determine direction
    const contentHasHebrew = React.Children.toArray(children).some(child => {
      if (typeof child === 'string') return hasHebrew(child);
      return false;
    });
    const contentDir = contentHasHebrew ? 'rtl' : (isRtl ? 'rtl' : 'ltr');
    const contentAlign = contentHasHebrew ? 'text-right' : (isRtl ? 'text-right' : 'text-left');
    
    // Special styling for Sheva Brachot
    const cardClassName = isSpecial
      ? `p-3 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/15 backdrop-blur-sm border-2 border-primary/50 shadow-lg hover:shadow-xl hover:border-primary/70 rounded-[var(--radius)] w-fit ${isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'} transition-all duration-300`
      : `p-2 bg-accent/10 backdrop-blur-sm border border-accent/30 shadow-sm hover:shadow-md rounded-[var(--radius)] w-fit ${isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'} transition-all duration-300`;
    
    const triggerClassName = isSpecial
      ? "flex items-center w-full group gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors duration-200"
      : "flex items-center w-full group gap-2 px-2 hover:bg-accent/20 rounded-lg transition-colors duration-200 py-1";
    
    const titleClassName = isSpecial
      ? `text-lg font-cormorant font-bold flex-1 ${isRtl ? 'text-right' : 'text-left'} text-primary`
      : `text-base font-cormorant font-semibold flex-1 ${isRtl ? 'text-right' : 'text-left'} text-foreground/90`;
    
    return (
    <Card className={cardClassName}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className={triggerClassName} dir={isRtl ? 'rtl' : 'ltr'}>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 flex-shrink-0 ${isSpecial ? 'text-primary' : 'text-primary'} ${isOpen ? 'rotate-180' : ''}`} />
          <h3 
            className={titleClassName}
            style={{ fontSize: `${fontSize * (isSpecial ? 0.95 : 0.85)}px` }}
          >
            {title}
          </h3>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div 
            className={`space-y-2 mt-4 px-2 ${contentAlign}`}
            style={{ fontSize: `${fontSize}px` }}
            dir={contentDir}
          >
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
  };

  return (
    <div className="space-y-4">
      {text.sections.opening.length > 0 && (
        <SectionCard sectionKey="opening" transparent>
          {text.sections.opening}
        </SectionCard>
      )}

      {text.sections.psalm.length > 0 && (
        <CollapsibleSection
          isOpen={openSections.zimmun}
          onToggle={() => setOpenSections(prev => ({ ...prev, zimmun: !prev.zimmun }))}
          titleKey="zimmun"
        >
          {text.sections.psalm.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}

      {text.sections.mainBlessingPart1 && text.sections.mainBlessingPart1.length > 0 && (
        <SectionCard sectionKey="mainBlessingPart1">
          {text.sections.mainBlessingPart1}
        </SectionCard>
      )}

      <CollapsibleSection
        isOpen={openSections.chanukah}
        onToggle={() => setOpenSections(prev => ({ ...prev, chanukah: !prev.chanukah }))}
        titleKey="chanukah"
      >
        {text.sections.chanukah && text.sections.chanukah.map((line, idx) => renderLine(line, idx))}
      </CollapsibleSection>

      <CollapsibleSection
        isOpen={openSections.purim}
        onToggle={() => setOpenSections(prev => ({ ...prev, purim: !prev.purim }))}
        titleKey="purim"
      >
        {text.sections.purim && text.sections.purim.map((line, idx) => renderLine(line, idx))}
      </CollapsibleSection>

      {text.sections.mainBlessingPart2 && text.sections.mainBlessingPart2.length > 0 && (
        <SectionCard sectionKey="mainBlessingPart2">
          {text.sections.mainBlessingPart2}
        </SectionCard>
      )}

      {calendar.isShabbat && text.sections.shabbat && (
        <CollapsibleSection
          isOpen={openSections.shabbat}
          onToggle={() => setOpenSections(prev => ({ ...prev, shabbat: !prev.shabbat }))}
          titleKey="shabbat"
        >
          {text.sections.shabbat.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}

      {text.sections.jerusalem.length > 0 && (
        <SectionCard sectionKey="jerusalem">
          {text.sections.jerusalem}
        </SectionCard>
      )}

      {text.sections.roshChodesh && text.sections.roshChodesh.length > 0 && (
        <CollapsibleSection
          isOpen={openSections.yaalehVeyavo}
          onToggle={() => setOpenSections(prev => ({ ...prev, yaalehVeyavo: !prev.yaalehVeyavo }))}
          titleKey="yaalehVeyavo"
        >
          {text.sections.roshChodesh.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}

      {text.sections.buildingJerusalem.length > 0 && (
        <SectionCard sectionKey="buildingJerusalem">
          {text.sections.buildingJerusalem}
        </SectionCard>
      )}

      {text.sections.benevolent.length > 0 && (
        <SectionCard sectionKey="benevolent">
          {text.sections.benevolent}
        </SectionCard>
      )}

      {text.sections.guestBlessing && text.sections.guestBlessing.length > 0 && (
        <CollapsibleSection
          isOpen={openSections.guestBlessing}
          onToggle={() => setOpenSections(prev => ({ ...prev, guestBlessing: !prev.guestBlessing }))}
          titleKey="guestBlessing"
        >
          {text.sections.guestBlessing.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}

      {text.sections.wedding && text.sections.wedding.length > 0 && (
        <CollapsibleSection
          isOpen={openSections.wedding}
          onToggle={() => setOpenSections(prev => ({ ...prev, wedding: !prev.wedding }))}
          titleKey="wedding"
        >
          {text.sections.wedding.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}

      {text.sections.britMilah && text.sections.britMilah.length > 0 && (
        <CollapsibleSection
          isOpen={openSections.britMilah}
          onToggle={() => setOpenSections(prev => ({ ...prev, britMilah: !prev.britMilah }))}
          titleKey="britMilah"
        >
          {text.sections.britMilah.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}

      {text.sections.conclusion.length > 0 && (
        <SectionCard sectionKey="conclusion">
          {text.sections.conclusion}
        </SectionCard>
      )}

      {text.sections.shevaBrachot && text.sections.shevaBrachot.length > 0 && (
        <CollapsibleSection
          isOpen={openSections.shevaBrachot}
          onToggle={() => setOpenSections(prev => ({ ...prev, shevaBrachot: !prev.shevaBrachot }))}
          titleKey="shevaBrachot"
          isSpecial={true}
        >
          {text.sections.shevaBrachot.map((line, idx) => renderLine(line, idx))}
        </CollapsibleSection>
      )}
    </div>
  );
};
