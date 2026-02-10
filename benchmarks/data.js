window.BENCHMARK_DATA = {
  "lastUpdate": 1770707321436,
  "repoUrl": "https://github.com/AMvdBM19/monoliet-n8n-builder",
  "entries": {
    "n8n-mcp Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "andresmarcel19@hotmail.com",
            "name": "Andres Mendoza",
            "username": "AMvdBM19"
          },
          "committer": {
            "email": "andresmarcel19@hotmail.com",
            "name": "Andres Mendoza",
            "username": "AMvdBM19"
          },
          "distinct": true,
          "id": "ef458d85264746cb17e0e7d7621e607e539d6b99",
          "message": "Initial setup: czlonkowski n8n-mcp for Monoliet\n\n- Cloned and configured czlonkowski/n8n-mcp v2.35.1\n- Added Monoliet Docker Compose config (docker-compose.monoliet.yml)\n- Added Monoliet env template (.env.monoliet.example)\n- Added VPS deployment guide (DEPLOYMENT.md)\n- Added Monoliet project overview (MONOLIET.md)\n- Includes pre-built node database (1,204 nodes, 2,737 templates)\n- Configured for Docker \"web\" network deployment on VPS\n\nReady for VPS deployment at /opt/docker/monoliet-n8n-builder\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-10T08:06:09+01:00",
          "tree_id": "3df4e76b32be60bbfb0e746ef7fe6d5b81c62075",
          "url": "https://github.com/AMvdBM19/monoliet-n8n-builder/commit/ef458d85264746cb17e0e7d7621e607e539d6b99"
        },
        "date": 1770707321182,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0136,
            "range": "0.3096",
            "unit": "ms",
            "extra": "73341 ops/sec"
          }
        ]
      }
    ]
  }
}