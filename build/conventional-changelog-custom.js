import angularPreset from 'conventional-changelog-angular';

const customPreset = {
  ...angularPreset,
  writer: {
    ...angularPreset.writer,
    commitGroupsSort: 'title',
    writerOpts: {
      ...angularPreset.writer?.writerOpts,
      commitGroupsSort: 'title',
    },
  },
  parser: {
    ...angularPreset.parser,
  },
  commitsSort: ['scope', 'subject'],
  types: [
    { type: 'feat',     section: 'Features' },
    { type: 'fix',      section: 'Bug Fixes' },
    { type: 'perf',     section: 'Performance Improvements' },
    { type: 'revert',   section: 'Reverts' },
    { type: 'docs',     section: 'Documentation' },
    { type: 'style',    section: 'Styles' },
    { type: 'refactor', section: 'Refactors' },
    { type: 'test',     section: 'Tests' },
    { type: 'build',    section: 'Build System' },
    { type: 'ci',       section: 'CI/CD' },
    { type: 'chore',    section: 'Chores' },
    { type: 'docs',     section: 'Documentation' },
  ],
}

export default customPreset