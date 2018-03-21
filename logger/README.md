This is a very simple façade to Winston CloudWatch or Console logger.

The other modules can import this logger module and reuse it.

The desired log verbosity can be set via this environment variable:

`LOG_LEVEL`

Possible values include:

* `debug`
* `info`
* `warn`
* `error`
