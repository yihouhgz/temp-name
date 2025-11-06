<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/87235396',
    name: 'yihouhgz',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yihouhgz' },
      { icon: 'twitter', link: 'https://github.com/yihouhgz' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/89999371',
    name: 'hljuju',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/hljuju' },
      { icon: 'twitter', link: 'https://github.com/hljuju' }
    ]
  }
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members />
