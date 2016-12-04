import sys
from unittest import TestCase, main as run_tests

NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

def main():
  note_previous = None
  semitones = []
  try:
    while True:
      note = raw_input('What note do you want to transition to? ').upper().strip()
      if note not in NOTES:
        print 'Invalid note: {}'.format(note)
        continue
      
      direction = raw_input('Which direction do you want to go [u/d] ').upper().strip()
      if direction not in ('U', 'D'):
        print 'Invalid direction: {}'.format(direction)
        continue
      
      if note_previous:
        semitone_delta = _get_semitone_delta(note_previous, note, direction)
      else:
        semitone_delta = 0
      note_previous = note
      semitones.append(semitone_delta)
      print semitone_delta

  except KeyboardInterrupt:
    _output_semitone_deltas(semitones)
    sys.exit(0)


def _get_semitone_delta(note_previous, note, direction):
  note_previous_index = NOTES.index(note_previous)
  note_index = NOTES.index(note)

  

  if direction == 'U':
    semitone_delta = note_index - note_previous_index
    if semitone_delta < 0:
        semitone_delta += len(NOTES)
  else:
    semitone_delta = note_previous_index - note_index
    if semitone_delta < 0:
      semitone_delta += len(NOTES)
    semitone_delta *= -1
  
  return semitone_delta

_TEMPLATE = """{
  semitoneDelta: %d,
  syllable: ''
},"""

def _output_semitone_deltas(semitone_deltas):
  for delta in semitone_deltas:
    print _TEMPLATE % delta


class TestDelta(TestCase):

  def test_up_in_range(self):
    delta = _get_semitone_delta('A', 'A#', 'U')
    self.assertEqual(1, delta)

    delta = _get_semitone_delta('A', 'G#', 'U')
    self.assertEqual(11, delta)
  
  def test_down_in_range(self):
    delta = _get_semitone_delta('G#', 'G', 'D')
    self.assertEqual(-1, delta)

    delta = _get_semitone_delta('G#', 'A', 'D')
    self.assertEqual(-11, delta)
  
  def test_up_around_range(self):
    delta = _get_semitone_delta('G#', 'A', 'U')
    self.assertEqual(1, delta)

    delta = _get_semitone_delta('G#', 'G', 'U')
    self.assertEqual(11, delta)
  
  def test_down_around_range(self):
    delta = _get_semitone_delta('A', 'G#', 'D')
    self.assertEqual(-1, delta)

    delta = _get_semitone_delta('G', 'G#', 'D')
    self.assertEqual(-11, delta)


if __name__ == "__main__":
  # run_tests()
  main()

