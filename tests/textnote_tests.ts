// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// MIT License
//
// Text Note Tests

/* eslint-disable */
// @ts-nocheck

import { Crescendo } from 'crescendo';
import { Flow } from 'flow';
import { Note } from 'note';
import { TextNote } from 'textnote';

import { equal, ok, QUnit, test } from './support/qunit_api';
import { TestOptions, VexFlowTests } from './vexflow_test_helpers';

const TextNoteTests = {
  Start(): void {
    QUnit.module('TextNote');
    test('VF.* API', this.VF_Prefix);
    const run = VexFlowTests.runTests;
    run('TextNote Formatting', this.formatTextNotes);
    run('TextNote Formatting 2', this.formatTextNotes2);
    run('TextNote Superscript and Subscript', this.superscriptAndSubscript);
    run('TextNote Formatting With Glyphs 0', this.formatTextGlyphs0);
    run('TextNote Formatting With Glyphs 1', this.formatTextGlyphs1);
    run('Crescendo', this.crescendo);
    run('Text Dynamics', this.textDynamics);
  },

  VF_Prefix(): void {
    equal(TextNote, VF.TextNote);
    equal(Crescendo, VF.Crescendo);
  },

  formatTextNotes(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 400, 200);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice1 = score.voice([
      f
        .StaveNote({ keys: ['c/4', 'e/4', 'a/4'], stem_direction: -1, duration: 'h' })
        .addAccidental(0, f.Accidental({ type: 'b' }))
        .addAccidental(1, f.Accidental({ type: '#' })),
      f.StaveNote({ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: 'q' }),
      f
        .StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: 'q' })
        .addAccidental(0, f.Accidental({ type: 'n' }))
        .addAccidental(1, f.Accidental({ type: '#' })),
    ]);

    const voice2 = score.voice([
      f.TextNote({ text: 'Center Justification', duration: 'h' }).setJustification(TextNote.Justification.CENTER),
      f.TextNote({ text: 'Left Line 1', duration: 'q' }).setLine(1),
      f.TextNote({ text: 'Right', duration: 'q' }).setJustification(TextNote.Justification.RIGHT),
    ]);

    const formatter = f.Formatter();
    formatter.joinVoices([voice1, voice2]).formatToStave([voice1, voice2], stave);

    f.draw();
    ok(true);
  },

  formatTextNotes2(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 600, 200);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice1 = score.voice([
      f.StaveNote({ keys: ['g/4'], stem_direction: 1, duration: '16' }),
      f.StaveNote({ keys: ['g/4'], stem_direction: 1, duration: '16' }),
      f.StaveNote({ keys: ['g/4'], stem_direction: 1, duration: '16' }),

      f.StaveNote({ keys: ['g/5'], stem_direction: -1, duration: '16' }),
      f.StaveNote({ keys: ['g/5'], stem_direction: -1, duration: '16' }),
      f.StaveNote({ keys: ['g/5'], stem_direction: -1, duration: '16' }),

      f.StaveNote({ keys: ['g/5', 'a/5'], stem_direction: -1, duration: '16' }),
      f.StaveNote({ keys: ['g/5', 'a/5'], stem_direction: -1, duration: '16' }),
      f.StaveNote({ keys: ['g/5', 'a/5'], stem_direction: -1, duration: '16' }),

      f.StaveNote({ keys: ['g/4', 'a/4'], stem_direction: 1, duration: '16' }),
      f.StaveNote({ keys: ['g/4', 'a/4'], stem_direction: 1, duration: '16' }),
      f.StaveNote({ keys: ['g/4', 'a/4'], stem_direction: 1, duration: '16' }),

      f.StaveNote({ keys: ['g/4', 'a/4'], stem_direction: 1, duration: 'q' }),
    ]);

    const voice2 = score.voice([
      f.TextNote({ text: 'C', duration: '16' }).setJustification(TextNote.Justification.CENTER),
      f.TextNote({ text: 'L', duration: '16' }),
      f.TextNote({ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

      f.TextNote({ text: 'C', duration: '16' }).setJustification(TextNote.Justification.CENTER),
      f.TextNote({ text: 'L', duration: '16' }),
      f.TextNote({ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

      f.TextNote({ text: 'C', duration: '16' }).setJustification(TextNote.Justification.CENTER),
      f.TextNote({ text: 'L', duration: '16' }),
      f.TextNote({ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

      f.TextNote({ text: 'C', duration: '16' }).setJustification(TextNote.Justification.CENTER),
      f.TextNote({ text: 'L', duration: '16' }),
      f.TextNote({ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

      f.TextNote({ text: 'R', duration: 'q' }).setJustification(TextNote.Justification.RIGHT),
    ]);

    f.Formatter().joinVoices([voice1, voice2]).formatToStave([voice1, voice2], stave);

    voice2.getTickables().forEach((note) => Note.plotMetrics(f.getContext(), note, 170));

    f.draw();

    ok(true);
  },

  superscriptAndSubscript(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 600, 230);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice1 = score.voice([
      f
        .StaveNote({ keys: ['c/4', 'e/4', 'a/4'], stem_direction: 1, duration: 'h' })
        .addAccidental(0, f.Accidental({ type: 'b' }))
        .addAccidental(1, f.Accidental({ type: '#' })),
      f.StaveNote({ keys: ['d/4', 'e/4', 'f/4'], stem_direction: 1, duration: 'q' }),
      f
        .StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: 1, duration: 'q' })
        .addAccidental(0, f.Accidental({ type: 'n' }))
        .addAccidental(1, f.Accidental({ type: '#' })),
    ]);

    const voice2 = score.voice([
      f.TextNote({ text: Flow.unicode.flat + 'I', superscript: '+5', duration: '8' }),
      f.TextNote({ text: 'D' + Flow.unicode.sharp + '/F', duration: '4d', superscript: 'sus2' }),
      f.TextNote({ text: 'ii', superscript: '6', subscript: '4', duration: '8' }),
      f.TextNote({ text: 'C', superscript: Flow.unicode.triangle + '7', subscript: '', duration: '8' }),
      f.TextNote({ text: 'vii', superscript: Flow.unicode['o-with-slash'] + '7', duration: '8' }),
      f.TextNote({ text: 'V', superscript: '7', duration: '8' }),
    ]);

    voice2.getTickables().forEach(function (note) {
      note.font = { family: 'Serif', size: 15, weight: '' };
      note.setLine(13);
      note.setJustification(TextNote.Justification.LEFT);
    });

    f.Formatter().joinVoices([voice1, voice2]).formatToStave([voice1, voice2], stave);

    f.draw();

    ok(true);
  },

  formatTextGlyphs0(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 600, 230);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice1 = score.voice([
      f
        .StaveNote({ keys: ['c/4', 'e/4', 'a/4'], stem_direction: -1, duration: 'h' })
        .addAccidental(0, f.Accidental({ type: 'b' }))
        .addAccidental(1, f.Accidental({ type: '#' })),
      f.StaveNote({ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: '8' }),
      f.StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
      f.StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
      f.StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
    ]);

    const voice2 = score.voice([
      f.TextNote({ text: 'Center', duration: '8' }).setJustification(TextNote.Justification.CENTER),
      f.TextNote({ glyph: 'f', duration: '8' }),
      f.TextNote({ glyph: 'p', duration: '8' }),
      f.TextNote({ glyph: 'm', duration: '8' }),
      f.TextNote({ glyph: 'z', duration: '8' }),

      f.TextNote({ glyph: 'mordent_upper', duration: '16' }),
      f.TextNote({ glyph: 'mordent_lower', duration: '16' }),
      f.TextNote({ glyph: 'segno', duration: '8' }),
      f.TextNote({ glyph: 'coda', duration: '8' }),
    ]);

    voice2.getTickables().forEach((n) => n.setJustification(TextNote.Justification.CENTER));

    f.Formatter().joinVoices([voice1, voice2]).formatToStave([voice1, voice2], stave);

    f.draw();

    ok(true);
  },

  formatTextGlyphs1(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 600, 230);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice1 = score.voice([
      f
        .StaveNote({ keys: ['c/4', 'e/4', 'a/4'], stem_direction: -1, duration: 'h' })
        .addAccidental(0, f.Accidental({ type: 'b' }))
        .addAccidental(1, f.Accidental({ type: '#' })),
      f.StaveNote({ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: '8' }),
      f.StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
      f.StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
      f.StaveNote({ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
    ]);

    const voice2 = score.voice([
      f.TextNote({ glyph: 'turn', duration: '16' }),
      f.TextNote({ glyph: 'turn_inverted', duration: '16' }),
      f.TextNote({ glyph: 'pedal_open', duration: '8' }).setLine(10),
      f.TextNote({ glyph: 'pedal_close', duration: '8' }).setLine(10),
      f.TextNote({ glyph: 'caesura_curved', duration: '8' }).setLine(3),
      f.TextNote({ glyph: 'caesura_straight', duration: '8' }).setLine(3),
      f.TextNote({ glyph: 'breath', duration: '8' }).setLine(2),
      f.TextNote({ glyph: 'tick', duration: '8' }).setLine(3),
      f.TextNote({ glyph: 'tr', duration: '8', smooth: true }).setJustification(TextNote.Justification.CENTER),
    ]);

    voice2.getTickables().forEach((n) => n.setJustification(TextNote.Justification.CENTER));

    f.Formatter().joinVoices([voice1, voice2]).formatToStave([voice1, voice2], stave);

    f.draw();

    ok(true);
  },

  crescendo(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 600, 230);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice = score.voice([
      f.TextNote({ glyph: 'p', duration: '16' }),
      new Crescendo({ duration: '4d' }).setLine(0).setHeight(25).setStave(stave),
      f.TextNote({ glyph: 'f', duration: '16' }),
      new Crescendo({ duration: '4' }).setLine(5).setStave(stave),
      new Crescendo({ duration: '4' }).setLine(10).setDecrescendo(true).setHeight(5).setStave(stave),
    ]);

    f.Formatter().joinVoices([voice]).formatToStave([voice], stave);

    f.draw();

    ok(true);
  },

  textDynamics(options: TestOptions): void {
    const f = VexFlowTests.makeFactory(options, 600, 230);
    const stave = f.Stave({ y: 40 });
    const score = f.EasyScore();

    const voice = score.voice(
      [
        f.TextDynamics({ text: 'sfz', duration: '4' }),
        f.TextDynamics({ text: 'rfz', duration: '4' }),
        f.TextDynamics({ text: 'mp', duration: '4' }),
        f.TextDynamics({ text: 'ppp', duration: '4' }),

        f.TextDynamics({ text: 'fff', duration: '4' }),
        f.TextDynamics({ text: 'mf', duration: '4' }),
        f.TextDynamics({ text: 'sff', duration: '4' }),
      ],
      { time: '7/4' }
    );

    f.Formatter().joinVoices([voice]).formatToStave([voice], stave);

    f.draw();

    ok(true);
  },
};

export { TextNoteTests };