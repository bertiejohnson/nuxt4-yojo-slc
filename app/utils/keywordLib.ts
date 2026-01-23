interface PlanetKeywordsStore {
  sun: string[]
  moon: string[]
  mercury: string[]
  venus: string[]
  mars: string[]
  jupiter: string[]
  saturn: string[]
  chiron: string[]
  uranus: string[]
  neptune: string[]
  pluto: string[]
}

const planetKeywordsStore: PlanetKeywordsStore = {
  sun: ['identity', 'vitality', 'consciousness', 'ego', 'willpower', 'life force', 'creative expression', 'authority', 'father figures', 'leadership', 'confidence', 'self-awareness', 'purpose', 'individuality', 'core essence', 'spirit', 'masculine energy', 'heart', 'central self', 'personal power', 'radiance', 'dignity', 'pride', 'authenticity', 'recognition', 'fame', 'honor'],
  moon: ['emotions', 'instincts', 'subconscious', 'mother figures', 'nurturing', 'security needs', 'habits', 'memory', 'receptivity', 'intuition', 'moods', 'feelings', 'emotional responses', 'comfort', 'home', 'family', 'the past', 'sensitivity', 'protection', 'cycles', 'rhythms', 'feminine energy', 'inner child', 'automatic reactions', 'needs', 'caregiving', 'belonging', 'roots'],
  mercury: ['communication', 'intellect', 'reasoning', 'learning', 'thinking', 'expression', 'information processing', 'curiosity', 'adaptability', 'versatility', 'mental agility', 'speech', 'writing', 'travel', 'commerce', 'negotiation', 'analysis', 'perception', 'logic', 'decision-making', 'youthfulness', 'social interaction', 'technology', 'transportation', 'short trips', 'siblings'],
  venus: ['love', 'beauty', 'harmony', 'relationships', 'attraction', 'pleasure', 'artistic expression', 'values', 'aesthetics', 'sensuality', 'affection', 'romance', 'partnerships', 'social grace', 'diplomacy', 'comfort', 'luxury', 'money matters', 'self-worth', 'charm', 'cooperation', 'balance in relationships', 'appreciation of art and nature', 'friendship', 'emotional connection', 'desire'],
  mars: ['action', 'energy', 'drive', 'assertion', 'courage', 'ambition', 'aggression', 'passion', 'initiative', 'competition', 'physical strength', 'willpower', 'determination', 'conflict', 'leadership', 'sexuality', 'motivation', 'survival instincts', 'risk-taking', 'independence', 'self-assertion', 'adventure', 'warrior spirit', 'focus on goals', 'overcoming obstacles'],
  jupiter: ['expansion', 'growth', 'abundance', 'optimism', 'wisdom', 'higher learning', 'philosophy', 'spirituality', 'good fortune', 'generosity', 'broad-mindedness', 'exploration', 'travel', 'legal matters', 'ethics', 'morality', 'teaching', 'mentorship', 'cultural understanding', 'opportunity', 'success', 'confidence', 'vision', 'big-picture thinking', 'faith', 'hope'],
  saturn: ['discipline', 'structure', 'responsibility', 'limitations', 'boundaries', 'hard work', 'patience', 'perseverance', 'authority', 'maturity', 'practicality', 'organization', 'time management', 'commitment', 'self-control', 'ambition', 'long-term goals', 'tradition', 'stability', 'endurance', 'wisdom through experience', 'seriousness', 'caution', 'realism'],
  chiron: ['healing', 'wounds', 'vulnerability', 'teaching', 'mentorship', 'self-discovery', 'personal growth', 'compassion', 'empathy', 'inner strength', 'transformation through pain', 'holistic healing', 'spiritual guidance', 'life lessons', 'resilience', 'overcoming adversity', 'integration of mind and body', 'awareness of limitations', 'courage to face fears', 'guidance for others'],
  uranus: ['innovation', 'change', 'freedom', 'individuality', 'rebellion', 'originality', 'progressiveness', 'technology', 'sudden insights', 'unpredictability', 'eccentricity', 'humanitarianism', 'future-oriented thinking', 'experimentation', 'breaking conventions', 'independence', 'non-conformity', 'disruption', 'awakening', 'visionary ideas', 'social change', 'inventiveness', 'adaptability'],
  neptune: ['dreams', 'intuition', 'spirituality', 'imagination', 'compassion', 'illusion', 'mysticism', 'empathy', 'artistic inspiration', 'subconscious mind', 'escapism', 'universal love', 'sensitivity', 'transcendence', 'idealism', 'creativity', 'fantasy', 'psychic abilities', 'selflessness', 'devotion', 'alchemy', 'otherworldliness'],
  pluto: ['transformation', 'power', 'rebirth', 'intensity', 'depth', 'control', 'regeneration', 'destruction and creation', 'hidden forces', 'psychological growth', 'obsession', 'secrets', 'evolution', 'crisis and renewal', 'inner strength', 'shadow self', 'empowerment', 'profound change', 'elimination of the old', 'resilience', 'catharsis', 'metamorphosis'],
}

export { planetKeywordsStore }
export type { PlanetKeywordsStore }
