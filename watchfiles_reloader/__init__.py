from pathlib import Path

import watchfiles
from django.utils import autoreload


class WatchfilesReloader(autoreload.BaseReloader):
    '''Monkey patches Django's BaseReloader'''

    def tick(self):
        roots = Path('/usr/src/app'),
        watcher = watchfiles.watch(
            *roots,
            debug=False,
            watch_filter=watchfiles.PythonFilter(),
        )
        for file_changes in watcher:
            for _change, path in file_changes:
                self.notify_file_changed(Path(path))
            yield


def replaced_get_reloader():
    return WatchfilesReloader()


autoreload.get_reloader = replaced_get_reloader
